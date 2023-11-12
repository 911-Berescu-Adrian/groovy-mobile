
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.LiveData
import androidx.navigation.NavHostController
import com.example.groovy.data.model.Album
import com.example.groovy.data.repository.AlbumRepository
import com.example.groovy.ui.composables.AlbumDeleteDialog

@Composable
fun AlbumListScreen(navController: NavHostController?, albums: LiveData<List<Album>>) {
    val albumList by albums.observeAsState(emptyList())
    var deleteClicked by remember { mutableStateOf(false) }
    var albumToDelete by remember { mutableStateOf(Album(0,"","",0,"",0))}

    Column {
        LazyColumn {
            items(albumList) { album ->
                AlbumCard(album = album) {
                    navController?.navigate("albumDetail/${album.albumId}")
                }
                Row {
                    Button(onClick = {
                        navController?.navigate("albumUpdate/${album.albumId}")
                    }) {
                        Text("Update")
                    }
                    Button(onClick = {
                        deleteClicked = true
                        albumToDelete = album
                    }) {
                        Text("Delete")
                    }
                }
            }
        }

        Button(onClick = { navController?.navigate("albumAdd") }) {
            Text("Add Album")
        }
    }

    if (deleteClicked) {
        AlbumDeleteDialog(album = albumToDelete, onConfirm = {
            AlbumRepository.deleteAlbum(albumToDelete.albumId)
            deleteClicked = false;
        }) {
            deleteClicked = false;
        }
    }

}


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AlbumCard(album: Album, onAlbumClick: () -> Unit) {
    Card(
        shape = MaterialTheme.shapes.medium,
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onAlbumClick)
            .padding(8.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(text = album.title, style = MaterialTheme.typography.headlineMedium)
            Text(text = album.artist, style = MaterialTheme.typography.bodyMedium)
        }
    }
}


