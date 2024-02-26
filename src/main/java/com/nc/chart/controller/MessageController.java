package com.nc.chart.controller;


import com.nc.chart.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message getMessage(@RequestBody Message message) {
        return message;
    }

}
