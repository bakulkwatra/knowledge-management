package in.co.serv.core.util;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Response<T> {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private T data;

    public Response() {}

    public Response(LocalDateTime timestamp, int status, String message, T data) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.data = data;
    }

}