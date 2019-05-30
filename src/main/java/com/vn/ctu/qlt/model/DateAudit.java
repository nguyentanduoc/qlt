package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public abstract class DateAudit implements Serializable {

    private static final long serialVersionUID = 7289371400308390522L;

    @CreatedDate
    @Column(nullable = false, updatable = false, name = "ngay_tao")
    private Date createdAt;

    @LastModifiedDate
    @Column(nullable = false, name = "ngay_cap_nhat")
    private Date updatedAt;
}
