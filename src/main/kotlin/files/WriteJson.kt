package com.github.berkeleysquare.files
     
import com.google.gson.Gson
import java.io.File
import kotlinx.serialization.Serializable

@Serializable
data class User(val name: String, val age: Int)

fun writeJsonToFile(filePath: String, data: Any) {
    val gson = Gson()
    val jsonString = gson.toJson(data)
    File(filePath).writeText(jsonString)
}

fun main() {
    val user = User("Jane Doe", 25)
    writeJsonToFile("/tmp/user_gson.json", user)
    println("JSON written to user_gson.json")
}
