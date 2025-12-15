package com.chess.backend.entity;

public class Invitation {

    private String from;
    private String to;
    private String status;

    public String getFrom() { return from; }
    public String getTo() { return to; }
    public String getStatus() { return status; }

    public void setFrom(String from) { this.from = from; }
    public void setTo(String to) { this.to = to; }
    public void setStatus(String status) { this.status = status; }
}
