package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BillRequestSearchDto {

    private Long id;

    private Date dateRequested;

    private Date dateExchanged;

    private Boolean isSeen;

    private Boolean isReceive;

    private String noteRequest;

    private String noteExchange;

    private Boolean isAccept;

    private Boolean isCancel;

    private Boolean isDone;
}
