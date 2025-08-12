package in.co.serv.core.dto;

import lombok.Data;

@Data
public class ResourceProcessLogDTO {
    private String processStatusFrom;
    private String processStatusTo;
    private String comments;
    private Long reviewBy;
    private Long createdBy;
    private Long updatedBy;
}
