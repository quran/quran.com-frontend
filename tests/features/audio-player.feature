Feature: Audio Player
As a user
I want listen to Ayah audio playback
So that I can learn and improve my recitation

  Scenario Outline:: Audio player stops on the last Ayah
    Given I am listening to Surah <Surah>
      And Audio is playing from Ayah <penultimateAyah>
     When It reaches the last Ayah <LastAyah>
     Then Audio playback should stop
  
    Examples: 
      | Surah | penultimateAyah | LastAyah | 
      | 114   | 5               | 6        | 
      | 113   | 3               | 4        | 
      | 112   | 3               | 4        | 
      | 111   | 4               | 5        | 
  
