
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.example.groovy.data.model.Album

@Composable
fun AlbumDetailScreen(album: Album, navigateBack: () -> Unit) {
    Column {
        Text(text = "Title: ${album.title}")
        Text(text = "Artist: ${album.artist}")
        Text(text = "Genre: ${album.genre}")
        Text(text = "Year: ${album.year}")
        Text(text = "No. songs: ${album.noSongs}")
        Button(onClick = { navigateBack() }) {
            Text("Back to Album List")
        }
    }
}
