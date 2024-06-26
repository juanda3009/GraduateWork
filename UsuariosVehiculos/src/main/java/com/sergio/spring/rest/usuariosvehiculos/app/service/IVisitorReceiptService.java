package com.sergio.spring.rest.usuariosvehiculos.app.service;

import java.time.Month;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.sergio.spring.rest.usuariosvehiculos.app.models.dto.entity.users.VisitorReceiptDto;
import com.sergio.spring.rest.usuariosvehiculos.app.models.entities.VisitorReceipt;

public interface IVisitorReceiptService {
    List<VisitorReceiptDto> visitorReceiptList();

    Optional<VisitorReceiptDto> findByIdVisitorReceipt(Long visitorReceiptId);

    @Transactional(readOnly = true)
    Optional<VisitorReceipt> findByIdVisitorReceiptDetails(Long visitorReceiptId);

    VisitorReceiptDto saveVisitorReceipt(VisitorReceipt visitorReceipt);

    Optional<VisitorReceiptDto> updateVisitorReceipt(VisitorReceipt visitorReceipt, Long visitorReceiptId);

    void changePaymentStatus(Long visitorReceiptId);

    void removeVisitorReceipt(Long visitorReceiptId);

    //contar recibos no pagos

    long getTotalVisitorUnpaidReceipts();

    //contar recibos pagos
    long getTotalVisitorPaidReceipts();

    //devolver el total de recibos visitante
    long getTotalVisitorReceipt();

    //Reportes
    Map<String, Double> getWeeklyIncome();
    Map<String, Double> getWeeklyIncome(int year, Month month);
    Map<String, Double> getBiWeeklyIncome();
    Map<String, Double> getDailyIncomeForCurrentWeek();
}