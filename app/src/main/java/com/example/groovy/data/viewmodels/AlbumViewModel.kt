package com.example.groovy.data.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.groovy.data.model.Album
import com.example.groovy.data.repository.AlbumRepository

class AlbumViewModel : ViewModel() {
    private val _albums = MutableLiveData<List<Album>>()
    val albums: LiveData<List<Album>> = _albums

    init {
        _albums.value = AlbumRepository.getAlbums()
    }

    fun fetchAlbums() {
        _albums.value = AlbumRepository.getAlbums()
    }
}