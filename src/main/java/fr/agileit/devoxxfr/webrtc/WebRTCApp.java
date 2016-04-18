package fr.agileit.devoxxfr.webrtc;

import java.io.IOException;

import net.codestory.http.WebServer;

public class WebRTCApp
{
    public static void main( String[] args ) throws IOException {
        /*String path = (new File(".").getCanonicalPath());
        new WebServer().startSSL(9443, Paths.get(path + "/app/server.crt"), Paths.get(path + "/app/server.der"));*/
        new WebServer().start(4242);
    }
}
