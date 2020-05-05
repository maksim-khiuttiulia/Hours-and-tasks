package com.mk.hoursandtasks.utils;

import org.junit.jupiter.api.Test;

import javax.rmi.CORBA.Util;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class DateUtilsTest {

    @Test
    void getCurrentDate() {
        Date expected = new Date();
        Date actual = DateUtils.getCurrentDate();
        assertEquals(expected, actual);
    }
}