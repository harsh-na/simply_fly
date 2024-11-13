package com.hexw.web.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "payment")
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @NotNull(message = "Booking ID is required")
    @Column(name = "booking_id", nullable = false)
    private Long bookingId;

    @NotNull(message = "Payment date is required")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "payment_date", nullable = false)
    private Date paymentDate;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Amount should have up to 10 digits and 2 decimal places")
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @NotBlank(message = "Transaction ID is required")
    @Size(max = 50, message = "Transaction ID should not exceed 50 characters")
    @Column(name = "transaction_id", nullable = false, length = 50)
    private String transactionId;

    @NotBlank(message = "Booking status is required")
    @Pattern(regexp = "^(success|failure)$", message = "Booking status must be 'success' or 'failure'")
    @Column(name = "booking_status", nullable = false)
    private String bookingStatus;

    // Default constructor
    public Payments() {
    }

    // All-args constructor
    public Payments(Long bookingId, Date paymentDate, BigDecimal amount, String transactionId, String bookingStatus) {
        this.bookingId = bookingId;
        this.paymentDate = paymentDate;
        this.amount = amount;
        this.transactionId = transactionId;
        this.bookingStatus = bookingStatus;
    }

	@Override
	public String toString() {
		return "Payments [paymentId=" + paymentId + ", bookingId=" + bookingId + ", paymentDate=" + paymentDate
				+ ", amount=" + amount + ", transactionId=" + transactionId + ", bookingStatus=" + bookingStatus + "]";
	}

	public Long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(String bookingStatus) {
		this.bookingStatus = bookingStatus;
	}
}

