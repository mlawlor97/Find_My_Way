package com.example.david.findmyway;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void goToMap(View view){
        Intent intent = new Intent(this, MapsActivity.class);
        EditText latText = (EditText) findViewById(R.id.etLatitude);
        EditText lonText = (EditText) findViewById(R.id.etLongitude);

        double latitude = Double.parseDouble(latText.getText().toString());
        double longitude = Double.parseDouble(lonText.getText().toString());

        intent.putExtra("latitude", latitude);
        intent.putExtra("longitude", longitude);

        startActivity(intent);
    }
}
