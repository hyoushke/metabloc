const gulp = require("gulp")
const sharpResponsive = require("gulp-sharp-responsive")

const responsive_img = () =>
  gulp
    .src("./public/assets/**/*.{jpg,jpeg,png}")
    .pipe(
      sharpResponsive({
        includeOriginalFile: true,
        formats: [
          // webp
          { width: 330, format: "webp", rename: { suffix: "-sm" } },
          { width: 768, format: "webp", rename: { suffix: "-md" } },
          {
            width: 1024,
            format: "webp",
            rename: { suffix: "-lg" },
          },
        ],
      })
    )
    .pipe(gulp.dest("./public/assets/"));

module.exports = { responsive_img };
