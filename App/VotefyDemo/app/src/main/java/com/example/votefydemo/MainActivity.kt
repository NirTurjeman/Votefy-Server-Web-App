package com.example.votefydemo

import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import votefy.VotefyClient
import android.content.Intent
import android.graphics.Typeface
import android.widget.Button
import android.graphics.Color
import android.widget.EditText
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    private lateinit var client: VotefyClient
    private lateinit var welcomeText: TextView
    private lateinit var userId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val changeUserButton: Button = findViewById(R.id.changeUserButton)
        changeUserButton.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
        client = VotefyClient("https://cd2f-2a00-a041-e94b-1700-a8a5-1fac-a041-6e24.ngrok-free.app/")
        welcomeText = findViewById(R.id.welcomeText)
        userId = intent.getStringExtra("USER_ID") ?: ""
        welcomeText.text = "Welcome, $userId"
        welcomeText.setTextColor(Color.GRAY)
        welcomeText.setTypeface(null, Typeface.BOLD)
        welcomeText.textSize = 28f
        checkForOpenVotes()

    }

    private fun checkForOpenVotes() {
        lifecycleScope.launch {
            try {
                val openVotes = client.voter.checkForOpenVote(userId)
                if (openVotes.isNotEmpty()) {
                    val vote = openVotes.first()
                    println("vote: ${vote.title}")
                    showVoteDialog(vote.title, vote.options ?: emptyList(), vote.id,
                        vote.type.toString()
                    )
                }else{
                    AlertDialog.Builder(this@MainActivity)
                        .setTitle("Alert")
                        .setMessage("No available votes at the moment.")
                        .setPositiveButton("OK", null)
                        .show()
                }
            } catch (e: Exception) {
                Log.e("MainActivity", "Failed to fetch votes: ${e.message}")
            }
        }
    }

    private fun showVoteDialog(title: String, options: List<String>, voteId: String, voteType: String) {
        if (voteType == "OPEN_POLL") {
            val editText = EditText(this)
            editText.hint = "Enter your answer"

            AlertDialog.Builder(this)
                .setTitle(title)
                .setView(editText)
                .setPositiveButton("Submit") { _, _ ->
                    val userInput = editText.text.toString()
                    if (userInput.isNotBlank()) {
                        submitVote(voteId, userInput)
                    } else {
                        Toast.makeText(this, "Please enter a valid answer.", Toast.LENGTH_SHORT).show()
                    }
                }
                .setNegativeButton("Cancel", null)
                .setCancelable(false)
                .show()

        } else {
            AlertDialog.Builder(this)
                .setTitle(title)
                .setItems(options.toTypedArray()) { _, which ->
                    val selected = options[which]
                    submitVote(voteId, selected)
                }
                .setCancelable(false)
                .show()
        }
    }


    private fun submitVote(voteId: String, answer: String) {
        lifecycleScope.launch {
            try {
                val success = client.voter.vote(
                    votefy.model.UserVote(
                        userID = userId,
                        pollID = voteId,
                        value = answer
                    )
                )
                if (success) {
                    showConfirmation("Your vote has been submitted.")
                } else {
                    showConfirmation("Failed to submit your vote.")
                }
            } catch (e: Exception) {
                Log.e("MainActivity", "Error voting: ${e.message}")
                showConfirmation("An error occurred.")
            }
        }
    }

    private fun showConfirmation(message: String) {
        AlertDialog.Builder(this)
            .setMessage(message)
            .setPositiveButton("OK", null)
            .show()
    }
    private suspend fun printDef(){
        val def = client.admin.getAllDefinitions()
        Log.e("defs","$def")
    }
}
