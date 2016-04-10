package fr.agileit.devoxxfr.webrtc;

import net.codestory.http.WebServer;

public class WebRTCApp
{
    public static void main( String[] args )
    {
        new WebServer().start(4242);
    }
}
