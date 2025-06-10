package com.github.berkeleysquare

import com.github.berkeleysquare.files.writeStringToDownload
import com.github.berkeleysquare.files.writeJsonToFile
import com.github.berkeleysquare.data.AlbumPayload
import com.github.berkeleysquare.data.SetListPayload
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.http.content.singlePageApplication
import io.ktor.server.http.content.staticResources
import io.ktor.server.http.content.staticFiles
import io.ktor.server.routing.*
import io.ktor.server.request.receiveText
import java.io.File

val workDirectory = File(System.getProperty("user.home"), "videoj")
val collectionPath = workDirectory.resolve("collection")
val setlistPath = workDirectory.resolve("setlist")

fun Application.configureRouting() {
       routing {
        staticResources("/", "landing", index = "index.html")
        staticResources("/landing", "landing", index = "index.html")
        get("/hello") {
            call.respondText("Yo!")
        }
        staticResources("/kindler", "kindler", index = "index.html")
        staticResources("/manager", "manager", index = "index.html")
        staticResources("/books/", "kindler/books")
        staticResources("/jkboxed", "jkboxed", index = "index.html")
        staticResources("/assets/", "jkboxed/assets")
        staticFiles("/collection", collectionPath)
        staticFiles("/setlist", setlistPath)
        post("/upload/collection") {
            val text = call.receiveText()
            // marshall the text into an AlbumPayload
            val album = AlbumPayload.fromJson(text)
            val collectionName = album.collection.ifEmpty() { "collection" }
            if (!collectionPath.exists()) {
                collectionPath.mkdirs()
            }
            val path = collectionPath.resolve(collectionName + ".json")
            writeJsonToFile(path.path, album)
            call.respondText(collectionName + ".json written to Downloads directory")
        }
        post("/upload/setlist") {
            val text = call.receiveText()
            // marshall the text into a SetListPayload
            val setList = kotlinx.serialization.json.Json.decodeFromString<SetListPayload>(text)
            val setListTitle = setList.setListTitle.ifEmpty { "setlist" }
            if (!setlistPath.exists()) {
                setlistPath.mkdirs()
            }
            val path = setlistPath.resolve(setListTitle + ".json")
            writeJsonToFile(path.path, setList)
            call.respondText(setListTitle + ".json written to Downloads directory")
        }
        get("/setlist") {
            if (!setlistPath.exists()) {
                call.respond(emptyList<String>())
                return@get
            }
            val jsonFiles = setlistPath.listFiles { file -> file.extension == "json" }
                ?.map { it.name }
                ?: emptyList()
            call.respond(jsonFiles)
        }
    }
}
