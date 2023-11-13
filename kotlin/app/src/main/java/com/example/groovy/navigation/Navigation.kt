package com.example.groovy.navigation

import AlbumDetailScreen
import AlbumListScreen
import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.groovy.data.repository.AlbumRepository
import com.example.groovy.data.viewmodels.AlbumViewModel
import com.example.groovy.ui.composables.AlbumAddScreen
import com.example.groovy.ui.composables.AlbumDeleteDialog
import com.example.groovy.ui.composables.AlbumUpdateScreen

@Composable
fun Navigation (albumViewModel: AlbumViewModel) {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = "albumList") {
        composable("albumList") {
            AlbumListScreen(navController, albumViewModel.albums)
        }
        composable("albumDetail/{albumId}") { backStackEntry ->
            val albumId = backStackEntry.arguments?.getString("albumId")
            val album = AlbumRepository.getAlbumById(albumId?.toIntOrNull() ?: 0)
            if (album != null) {
                AlbumDetailScreen(album) {
                    navController.navigateUp()
                }
            }
        }
        composable("albumAdd") {
            AlbumAddScreen {
                navController.navigateUp()
            }
        }

        composable("albumUpdate/{albumId}") { backStackEntry ->
            val albumId = backStackEntry.arguments?.getString("albumId")
            val album = AlbumRepository.getAlbumById(albumId?.toIntOrNull() ?: 0)
            if (album != null) {
                AlbumUpdateScreen(album) {
                    navController.navigateUp()
                }
            }
        }

    }
}