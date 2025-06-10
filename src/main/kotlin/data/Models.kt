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
    val album: String? = null
)

@Serializable
data class EnsembleItem(
    val id: String,
    val text: String,
    val collection: String? = null
)
