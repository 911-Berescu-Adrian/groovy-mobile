package com.example.groovy.data.repository

import com.example.groovy.data.model.Album

object AlbumRepository {
    private val albums = mutableListOf<Album>();

    init {
        albums.addAll(listOf(
            Album(1, "My Beautiful Dark Twisted Fantasy", "Kanye West", 2010, "Hip-Hop", 13),
            Album(2, "Dummy Album", "Artist", 2019, "Rock", 16),
            Album(3, "loveless", "My Bloody Valentine", 1991, "Shoegaze", 11)
        ))
    }

    fun getAlbumById(id: Int): Album? {
        return albums.find { it.albumId == id }
    }

    fun getNewId(): Int {
        return return if (albums.isEmpty()) 0 else albums.maxOf { it.albumId } + 1;
    }

    fun getAlbums(): List<Album> {
        return albums;
    }

    fun addAlbum(album: Album) {
        albums.add(album);
    }

    fun updateAlbum(album: Album) {
        val index = albums.indexOfFirst { it.albumId == album.albumId };
        if (index != -1)
            albums[index] = album;
    }

    fun deleteAlbum(id: Int) {
        albums.removeIf { it.albumId == id }
    }
}