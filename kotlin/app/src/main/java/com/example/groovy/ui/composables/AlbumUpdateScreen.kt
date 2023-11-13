package com.example.groovy.ui.composables

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.groovy.data.model.Album

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AlbumUpdateScreen(album: Album, navigateBack: () -> Unit) {

    var title by remember { mutableStateOf(album.title) }
    var artist by remember { mutableStateOf(album.artist) }
    var year by remember { mutableStateOf(album.year.toString()) }
    var genre by remember { mutableStateOf(album.genre) }
    var noSongs by remember { mutableStateOf(album.noSongs.toString()) }
    var yearError by remember { mutableStateOf(false) }
    var songsError by remember { mutableStateOf(false) }
    var emptyError by remember { mutableStateOf(false) }
    var isButtonClicked by remember { mutableStateOf(false) }



    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Title") },
            modifier = Modifier.padding(vertical = 8.dp)
        )

        OutlinedTextField(
            value = artist,
            onValueChange = { artist = it },
            label = { Text("Artist") },
            modifier = Modifier.padding(vertical = 8.dp)
        )

        OutlinedTextField(
            value = year.toString(),
            onValueChange = {
                if (it.matches("^[0-9]*$".toRegex()) || it.isEmpty()) {
                    year = it
                    yearError = false
                } else {
                    yearError = true
                }
            },
            label = { Text("Year") },
            modifier = Modifier.padding(vertical = 8.dp)
        )

        OutlinedTextField(
            value = genre,
            onValueChange = { genre = it },
            label = { Text("Genre") },
            modifier = Modifier.padding(vertical = 8.dp)
        )

        OutlinedTextField(
            value = noSongs.toString(),
            onValueChange = {
                if (it.matches("^[0-9]*$".toRegex()) || it.isEmpty()) {
                    noSongs = it
                    songsError = false
                } else {
                    songsError = true
                }
            },
            label = { Text("No. Songs") },
            modifier = Modifier.padding(vertical = 8.dp)
        )

        if (isButtonClicked && (title.isEmpty() || artist.isEmpty() || year.isEmpty() || genre.isEmpty() || noSongs.isEmpty())) {
            emptyError = true
            Text("Please complete all the fields", color = Color.Red)
        }

        if (yearError) {
            Text("Please enter a valid year", color = Color.Red)
        }

        if (songsError) {
            Text("Please enter a valid number of songs", color = Color.Red)
        }

        Button(onClick = {
            isButtonClicked = true
            if(title.isNotEmpty() && artist.isNotEmpty() && year.isNotEmpty() && genre.isNotEmpty() && noSongs.isNotEmpty())
                if (!yearError && !songsError) {
                    album.title = title
                    album.artist = artist
                    album.year = year.toIntOrNull() ?: 0
                    album.genre = genre
                    album.noSongs = noSongs.toIntOrNull() ?: 0
                    navigateBack()
                }
        }) {
            Text("Update Album")
        }

        Button(onClick = { navigateBack() }) {
            Text("Back to Album List")
        }
    }
}