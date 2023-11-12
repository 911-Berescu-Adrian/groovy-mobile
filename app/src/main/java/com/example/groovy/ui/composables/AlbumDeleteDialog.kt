package com.example.groovy.ui.composables

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.example.groovy.data.model.Album

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AlbumDeleteDialog(
    album: Album,
    onConfirm: () -> Unit,
    onDimiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDimiss,
        title = { Text("Delete Album") },
        text = { Text("Are you sure you want to delete \"${album.title}\"?") },
        confirmButton = {
            Button(onClick = onConfirm) {
                Text("Delete")
            }
        },
        dismissButton = {
            Button(onClick = onDimiss) {
                Text("Cancel")
            }
        }
    )
}
