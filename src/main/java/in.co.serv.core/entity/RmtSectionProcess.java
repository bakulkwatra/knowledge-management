package in.co.serv.core.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "rmt_section_process")
@Data
    public class RmtSectionProcess {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "section_id", nullable = false)
    private Long sectionId;

    @ManyToOne
    @JoinColumn(name = "section_id", referencedColumnName = "id", insertable = false, updatable = false)
    private ReSection section;

    @Column(name = "process_status_from", nullable = false, length = 30)
    private String processStatusFrom;

    @Column(name = "process_status_to", nullable = false, length = 30)
    private String processStatusTo;

    @Column(name = "review_by", nullable = false)
    private Long reviewBy;

    @Column(name = "comments", nullable = false, columnDefinition = "TEXT")
    private String comments;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Long updatedBy;


}