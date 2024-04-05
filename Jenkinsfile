pipeline {
  agent any
  environment {
    REGISTRY_HOST = credentials('docker-registry-host')
    REGISTRY_HOST_REMOTE = credentials('docker-registry-domain')
    JENKINS_SERVER = credentials('jenkins-server')
    GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase().trim()
    COMPOSE_PROJECT_NAME = 'marketbloc'
    SLACK_CHANNEL = 'C065TJF9NDQ'
  }

  stages {
    stage('Build') {
      when {
        allOf {
          not {
            changeRequest()
          }
          anyOf {
            branch 'master'
            branch 'main'
            branch 'stage'
            branch 'dev'
            branch 'development'
          }
        }
      }

      steps {
        script {
            sh """
              case \$BRANCH_NAME in
                development)
                  BUILD_ENV=development
                  ;;
                stage)
                  BUILD_ENV=staging
                  ;;
                master | main)
                  BUILD_ENV=production
                  ;;
                *)
                  BUILD_ENV=development
                  ;;
              esac

              docker build . \
                -f Dockerfile \
                --build-arg build_env=\${BUILD_ENV} \
                -t ${GIT_REPO_NAME}.\${BRANCH_NAME} \
                -t ${GIT_REPO_NAME}.\${BRANCH_NAME}:\${BUILD_NUMBER} \
                -t \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME} \
                -t \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME}:\${BUILD_NUMBER} \
                -t ${GIT_REPO_NAME}-\${BRANCH_NAME} \
                -t ${GIT_REPO_NAME}-\${BRANCH_NAME}:\${BUILD_NUMBER} \
                -t \${REGISTRY_HOST}/${GIT_REPO_NAME}-\${BRANCH_NAME} \
                -t \${REGISTRY_HOST}/${GIT_REPO_NAME}-\${BRANCH_NAME}:\${BUILD_NUMBER}

              docker push -a \${REGISTRY_HOST}/${GIT_REPO_NAME}.\${BRANCH_NAME}
            """

          if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "main") {
            notify_slack('Production build success')
          }
        }
      }
    }

    stage('Start') {
      parallel {
        stage('Prod') {
          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'main'
                branch 'master'
              }
            }
          }

          stages {
            stage('Approve') {
              input {
                message 'Deploy this build?'
                ok 'Yes'
                submitter 'dsemyonov, zdoroshenko'
              }

              environment {
                LOKI = credentials('LOKI')
                DOCKER = credentials('DOCKER')
                SSH_PROFILE = 'digital-human'
                FOLDER = 'frontend-marketbloc'
                DOMAIN = 'marketbloc.metacryptixlabs.com'
                ENV_FILE = '.env.production'
                PUBLIC_URL = 'https://marketbloc.metacryptixlabs.com/'
              }

              steps {
                sh """
                  ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no ${SSH_PROFILE} bash -c "'
                    mkdir -p ${FOLDER}
                  '"

                  scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no docker-compose.prod.yml ${SSH_PROFILE}:${FOLDER}
                  scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no ${ENV_FILE} ${SSH_PROFILE}:${FOLDER}

                  ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no ${SSH_PROFILE} \
                    bash -c "'
                      cd ${FOLDER}
                      echo GIT_REPO_NAME=${GIT_REPO_NAME} >> ${ENV_FILE}
                      echo REGISTRY_HOST_REMOTE=${REGISTRY_HOST_REMOTE} >> ${ENV_FILE}
                      echo BRANCH_NAME=${BRANCH_NAME} >> ${ENV_FILE}
                      echo COMPOSE_PROJECT_NAME=production-${COMPOSE_PROJECT_NAME} >> ${ENV_FILE}
                      echo LOKI_USR=${LOKI_USR} >> ${ENV_FILE}
                      echo LOKI_PSW=${LOKI_PSW} >> ${ENV_FILE}
                      echo DOMAIN=${DOMAIN} >> ${ENV_FILE}
                      echo ${DOCKER_PSW} > .docker_password
                      cat .docker_password | docker login ${REGISTRY_HOST_REMOTE} -u ${DOCKER_USR} --password-stdin
                      COMPOSE_PROJECT_NAME=production-${COMPOSE_PROJECT_NAME} docker compose -f docker-compose.prod.yml --env-file ${ENV_FILE} pull
                      COMPOSE_PROJECT_NAME=production-${COMPOSE_PROJECT_NAME} docker compose -f docker-compose.prod.yml --env-file ${ENV_FILE} up -d
                    '"

                  git restore ${ENV_FILE}
                """
                slackSend channel: env.SLACK_CHANNEL, color: "good", message: "Build for ${GIT_REPO_NAME}/${BRANCH_NAME} is successfull: ${PUBLIC_URL}"
              }
            }
          }
        }

        stage('Stage') {
          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'stage'
              }
            }
          }

          environment {
            ENV_FILE = '.env.staging'
            PUBLIC_URL = 'https://marketbloc-stage.unistory.app/'
          }

          steps {
            script {
              sh """
                echo REGISTRY_HOST=${REGISTRY_HOST} >> ${ENV_FILE}
                echo GIT_REPO_NAME=${GIT_REPO_NAME} >> ${ENV_FILE}
                echo BRANCH_NAME=${BRANCH_NAME} >> ${ENV_FILE}
                echo COMPOSE_PROJECT_NAME=stage-${COMPOSE_PROJECT_NAME} >> ${ENV_FILE}

                if [ "\$(COMPOSE_PROJECT_NAME=stage-${COMPOSE_PROJECT_NAME} docker-compose -f docker-compose.stage.yml port traefik 80)" ]; then
                  IMAGE_PREVIOUS_PORT="\$(COMPOSE_PROJECT_NAME=stage-${COMPOSE_PROJECT_NAME} docker-compose -f docker-compose.stage.yml port traefik 80 | egrep "[0-9]+\$" -o)"
                fi

                if [ -z "\${IMAGE_PREVIOUS_PORT}" ]; then
                  WEB_PORT=80 \
                  COMPOSE_PROJECT_NAME=stage-${COMPOSE_PROJECT_NAME} \
                    docker-compose -f docker-compose.stage.yml --env-file ${ENV_FILE} up -d
                else
                  WEB_PORT="\${IMAGE_PREVIOUS_PORT}:80" \
                  COMPOSE_PROJECT_NAME=stage-${COMPOSE_PROJECT_NAME} \
                    docker-compose -f docker-compose.stage.yml --env-file ${ENV_FILE} up -d
                fi
              """
            }
            slackSend channel: env.SLACK_CHANNEL, color: "good", message: "Build for ${GIT_REPO_NAME}/${BRANCH_NAME} is successfull: ${PUBLIC_URL}"
          }
        }

        stage('Dev') {
          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'dev'
                branch 'development'
              }
            }
          }

          environment {
            ENV_FILE = '.env.development'
            PUBLIC_URL = 'https://marketbloc.unistory.app/'
          }

          steps {
            script {
              sh """
                echo REGISTRY_HOST=${REGISTRY_HOST} >> ${ENV_FILE}
                echo GIT_REPO_NAME=${GIT_REPO_NAME} >> ${ENV_FILE}
                echo BRANCH_NAME=${BRANCH_NAME} >> ${ENV_FILE}
                echo COMPOSE_PROJECT_NAME=development-${COMPOSE_PROJECT_NAME} >> ${ENV_FILE}

                if [ "\$(COMPOSE_PROJECT_NAME=development-${COMPOSE_PROJECT_NAME} docker-compose port traefik 80)" ]; then
                  IMAGE_PREVIOUS_PORT="\$(COMPOSE_PROJECT_NAME=development-${COMPOSE_PROJECT_NAME} docker-compose port traefik 80 | egrep "[0-9]+\$" -o)"
                fi

                if [ -z "\${IMAGE_PREVIOUS_PORT}" ]; then
                  WEB_PORT=80 \
                  COMPOSE_PROJECT_NAME=development-${COMPOSE_PROJECT_NAME} \
                    docker-compose --env-file ${ENV_FILE} up -d
                else
                  WEB_PORT="\${IMAGE_PREVIOUS_PORT}:80" \
                  COMPOSE_PROJECT_NAME=development-${COMPOSE_PROJECT_NAME} \
                    docker-compose --env-file ${ENV_FILE} up -d
                fi
              """
            }
            slackSend channel: env.SLACK_CHANNEL, color: "good", message: "Build for ${GIT_REPO_NAME}/${BRANCH_NAME} is successfull: ${PUBLIC_URL}"
          }
        }
      }
    }
  }

  post {
    failure {
      script {
        if (
          env.BRANCH_NAME == "dev" ||
          env.BRANCH_NAME == "development" ||
          env.BRANCH_NAME == "stage" ||
          env.BRANCH_NAME == "master" ||
          env.BRANCH_NAME == "main"
         ) {
          notify_slack('Build failure')
        }
      }
    }
  }
}

