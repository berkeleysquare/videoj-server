package com.github.berkeleysquare.data

import kotlinx.serialization.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*
import kotlinx.serialization.json.*

@Serializable
data class AlbumPayload(
    val title: String,
    val collection: String,
    val description: String,
    val assets: String,
    val media: String,
    val defaultID: Int,
    val ensembles: List<EnsembleItem>,
    val data: List<VideoItem>
) {
    companion object {
        fun fromJson(json: String): AlbumPayload {
            val jsonParser = Json { ignoreUnknownKeys = true }
            return jsonParser.decodeFromString(json)
        }
    }
}

@Serializable
data class SetListPayload(
    val setList: List<VideoItem>,
    val setListTitle: String
)

@Serializable
data class VideoItem(
    val id: Int,
    val title: String,
    val description: String? = null,
    val ensemble: String? = null,
    val media: String,
    val composer: String? = null,
    val copyright: String? = null,
    val poster: String? = null,
    val recorded: String? = null,
    val album: String? = null,
    val aspectRatio: String? = null
)

@Serializable
data class EnsembleItem(
    val id: String,
    val text: String,
    val collection: String? = null
)

@Serializable
data class FileEvent(
    val jobId: String,
    val eventClass: String,
    val eventType: String,
    val timeStamp: Long,
    val payload: EventPayload
)

@Serializable
data class EventPayload(
    val type: String,
    val uuid: String,
    val fileId: String,
    val fileName: String,
    val jobId: String,
    val jobType: String,
    val targetUri: String,
    val status: String,
    val statusMessage: String
)

@Serializable
data class JobEvent(
    val jobId: String,
    val eventClass: String,
    val eventType: String,
    val timeStamp: Long,
    val payload: JobPayload
)

@Serializable
data class JobPayload(
    val type: String,
    val uuid: String,
    val jobId: String,
    val jobType: String,
    val status: String,
    val statusMessage: String
)
