package com.github.berkeleysquare.files

import java.io.File

fun writeStringToFile(filePath: String, out: String) {
    File(filePath).writeText(out)
}

fun writeStringToDownload(fileName: String, out: String) {
    val downloadPath = "/users/jk/Downloads/" + fileName
    writeStringToFile(downloadPath, out)
}


fun main() {
    writeStringToDownload("out.txt", "Hello, World!")
    println("JSON written to out.txt in Downloads directory")
}
