import { ConfigHelper } from './config.helper'

describe('ConfigHelper', () => {
  // Tests that ConfigHelper can retrieve VITE_SERVER_URL
  it("should retrieve VITE_SERVER_URL when calling get('VITE_SERVER_URL')", () => {
    // Arrange
    const expected = process.env.VITE_SERVER_URL
    console.log(process.env.VITE_SERVER_URL)

    // Act
    const result = ConfigHelper.get('VITE_SERVER_URL')

    console.log(result)

    // Assert
    expect(result).toBe(expected)
  })

  // Tests that ConfigHelper can retrieve VITE_APP_URL
  it("should retrieve VITE_APP_URL when calling get('VITE_APP_URL')", () => {
    // Arrange
    const expected = process.env.VITE_APP_URL

    // Act
    const result = ConfigHelper.get('VITE_APP_URL')

    // Assert
    expect(result).toBe(expected)
  })
})
