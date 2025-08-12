package in.co.serv.core.dto;

import lombok.Data;

@Data
public class SectionProcessLogDTO {
    private String processStatusFrom;
    private String processStatusTo;
    private Long reviewBy;
    private String comments;
    private Long createdBy;
    private Long updatedBy;
}
