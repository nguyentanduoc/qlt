package com.vn.ctu.qlt.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BillRequestConditionDto {

    private Boolean isSeen;

    private Boolean isReceive;

    private Boolean isAccept;

    private Boolean isDone;

    private Boolean isCancel;

    private Long id;

    private Date dateCreated;

}
