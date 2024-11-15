package com.hexw.web.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "refund")
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refundId;

    @NotNull(message = "Booking ID is required.")
    @Column(nullable = false)
    private Long bookingId;

    @DecimalMin(value = "0.0", inclusive = false, message = "Refund amount must be positive.")
    @Digits(integer = 10, fraction = 2, message = "Invalid format for refund amount.")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal refundAmount;

    @NotNull(message = "Refund date is required.")
    @Temporal(TemporalType.DATE)
    private Date refundDate;

	public Refund(Long refundId, Long bookingId,
			 BigDecimal refundAmount, Date refundDate) {
		super();
		this.refundId = refundId;
		this.bookingId = bookingId;
		this.refundAmount = refundAmount;
		this.refundDate = refundDate;
	}

	public Long getRefundId() {
		return refundId;
	}

	public void setRefundId(Long refundId) {
		this.refundId = refundId;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public BigDecimal getRefundAmount() {
		return refundAmount;
	}

	public void setRefundAmount(BigDecimal refundAmount) {
		this.refundAmount = refundAmount;
	}

	public Date getRefundDate() {
		return refundDate;
	}

	public void setRefundDate(Date refundDate) {
		this.refundDate = refundDate;
	}

	@Override
	public String toString() {
		return "RefundModel [refundId=" + refundId + ", bookingId=" + bookingId + ", refundAmount=" + refundAmount
				+ ", refundDate=" + refundDate + "]";
	}

	public Refund() {
		
	}
}