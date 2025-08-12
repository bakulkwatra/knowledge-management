package in.co.serv.core.config;

import in.co.serv.core.util.Response;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class ResponseFormatAspect {

    @Around("execution(* in.co.serv.core.controller..*(..))")
    public Object wrapResponse(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = joinPoint.proceed();

        if (result instanceof ResponseEntity<?>) {
            ResponseEntity<?> entity = (ResponseEntity<?>) result;
            return ResponseEntity
                    .status(entity.getStatusCode())
                    .body(new Response<>(
                            LocalDateTime.now(),
                            entity.getStatusCodeValue(),
                            "Success",
                            entity.getBody()
                    ));
        }

        return new Response<>(
                LocalDateTime.now(),
                200,
                "Success",
                result
        );
    }
}