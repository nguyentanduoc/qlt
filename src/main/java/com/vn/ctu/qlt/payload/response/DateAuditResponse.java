package com.vn.ctu.qlt.payload.response;

import java.io.Serializable;
import java.util.Date;

public abstract class DateAuditResponse implements Serializable {

	private static final long serialVersionUID = -276462371851358981L;

	private Date createdAt;

	private Date updatedAt;

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
