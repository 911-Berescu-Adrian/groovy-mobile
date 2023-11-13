package com.example.groovy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.lifecycle.ViewModelProvider
import com.example.groovy.data.viewmodels.AlbumViewModel
import com.example.groovy.navigation.Navigation

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val viewModel = ViewModelProvider(this).get(AlbumViewModel::class.java)
            Navigation(viewModel)
        }
    }
}
