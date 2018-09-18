package com.app_android_test.utils;

import android.os.Build;

import com.app_android_test.BuildConfig;

public class Log {

    private static final String TAG = "UI_Log";
    
    public static boolean USE_LEVEL_E = true;
    public static boolean USE_LEVEL_W = true;
    public static boolean USE_LEVEL_I = true;
    public static boolean USE_LEVEL_V = true;
    public static boolean USE_LEVEL_D = true;
    
    private final static int LOG4J_GENERAL = 1;
    private final static int LOG4J_NETWORK = 2;
    private final static int LOG4J_UI = 3;

//    private final int LOG4J_MAX_BACKUP = 10;
    

    /**
     * log level<br>
     * LEVEL_E: error level<br>
     * LEVEL_W: warning level<br>
     * LEVEL_I: info level<br>
     * LEVEL_V: verbose level<br>
     * LEVEL_D: debug level
     */
    private enum LEVEL {
        LEVEL_E, LEVEL_W, LEVEL_I, LEVEL_V, LEVEL_D
    };

    private static final String[] mLogClass = {};
    
    public static void logGeneral(String level, String tag, String msg) {
        log4jMessage(LOG4J_GENERAL, level, tag, msg);
    }
    
    public static void logNetwork(String level, String tag, String msg) {
        log4jMessage(LOG4J_NETWORK, level, tag, msg);
    }    
    
    public static void logUi(String level, String tag, String msg) {
        log4jMessage(LOG4J_UI, level, tag, msg);
    }    

    public static void e(String tag, String msg) {
        logMessage(LEVEL.LEVEL_E, tag, msg);
    }
    
    public static void e(String tag, String msg, Throwable e) {
        logMessage(LEVEL.LEVEL_E, tag, msg, e);
    }

    public static void w(String tag, String msg) {
        logMessage(LEVEL.LEVEL_W, tag, msg);
    }

    public static void i(String tag, String msg) {
        logMessage(LEVEL.LEVEL_I, tag, msg);
    }

    public static void v(String tag, String msg) {
        logMessage(LEVEL.LEVEL_V, tag, msg);
    }

    public static void d(String tag, String msg) {
        logMessage(LEVEL.LEVEL_D, tag, msg);
    }

    public static void efn(String tag, String msg) {
        logMessage_fn(LEVEL.LEVEL_E, tag, msg);
    }

    public static void wfn(String tag, String msg) {
        logMessage_fn(LEVEL.LEVEL_W, tag, msg);
    }

    public static void ifn(String tag, String msg) {
        logMessage_fn(LEVEL.LEVEL_I, tag, msg);
    }

    public static void vfn(String tag, String msg) {
        logMessage_fn(LEVEL.LEVEL_V, tag, msg);
    }

    public static void dfn(String tag, String msg) {
        logMessage_fn(LEVEL.LEVEL_D, tag, msg);
    }

    public static void efncn(String tag, String msg) {
        logMessage_fncn(LEVEL.LEVEL_E, tag, msg);
    }

    public static void wfncn(String tag, String msg) {
        logMessage_fncn(LEVEL.LEVEL_W, tag, msg);
    }

    public static void ifncn(String tag, String msg) {
        logMessage_fncn(LEVEL.LEVEL_I, tag, msg);
    }

    public static void vfncn(String tag, String msg) {
        logMessage_fncn(LEVEL.LEVEL_V, tag, msg);
    }

    public static void dfncn(String tag, String msg) {
        logMessage_fncn(LEVEL.LEVEL_D, tag, msg);
    }

    public static void e(String tag, StackTraceElement[] stack) {
        printStackTrace(tag, stack, LEVEL.LEVEL_E);
    }

    public static void w(String tag, StackTraceElement[] stack) {
        printStackTrace(tag, stack, LEVEL.LEVEL_W);
    }

    public static void i(String tag, StackTraceElement[] stack) {
        printStackTrace(tag, stack, LEVEL.LEVEL_I);
    }

    public static void v(String tag, StackTraceElement[] stack) {
        printStackTrace(tag, stack, LEVEL.LEVEL_V);
    }

    public static void d(String tag, StackTraceElement[] stack) {
        printStackTrace(tag, stack, LEVEL.LEVEL_D);
    }

    private static void logMessage_fn(LEVEL level, String tag, String msg) {
        if (BuildConfig.DEBUG) {
            logMessage(level, tag, "[" + getFuncName(3) + "] " + msg);
        }
    }

    private static void logMessage_fncn(LEVEL level, String tag, String msg) {
        if (BuildConfig.DEBUG) {
            logMessage(level, tag, "[" + getFuncName(3) + " from "
                    + getFuncName(4) + "] " + msg);
        }
    }

    private static void logMessage(LEVEL level, String tag, String msg) {

        if (BuildConfig.DEBUG) {
            return;
        }

        if (isContainTag(tag) == false
                || (level == LEVEL.LEVEL_E && USE_LEVEL_E == false)
                || (level == LEVEL.LEVEL_W && USE_LEVEL_W == false)
                || (level == LEVEL.LEVEL_I && USE_LEVEL_I == false)
                || (level == LEVEL.LEVEL_V && USE_LEVEL_V == false)
                || (level == LEVEL.LEVEL_D && USE_LEVEL_D == false)) {
            return;
        }

        msg = "[" + TAG + "]" + msg;

        switch (level) {
            case LEVEL_E:
                android.util.Log.e(tag, msg);
                break;
            case LEVEL_W:
                android.util.Log.w(tag, msg);
                break;
            case LEVEL_I:
                android.util.Log.i(tag, msg);
                break;
            case LEVEL_V:
                android.util.Log.v(tag, msg);
                break;
            case LEVEL_D:
                android.util.Log.d(tag, msg);
                break;
        }
    }
    
    private static void logMessage(LEVEL level, String tag, String msg, Throwable e) {

        if (BuildConfig.DEBUG) {
            return;
        }

        if (isContainTag(tag) == false
                || (level == LEVEL.LEVEL_E && USE_LEVEL_E == false)
                || (level == LEVEL.LEVEL_W && USE_LEVEL_W == false)
                || (level == LEVEL.LEVEL_I && USE_LEVEL_I == false)
                || (level == LEVEL.LEVEL_V && USE_LEVEL_V == false)
                || (level == LEVEL.LEVEL_D && USE_LEVEL_D == false)) {
            return;
        }

        msg = "[" + TAG + "]" + msg;

        switch (level) {
            case LEVEL_E:
                android.util.Log.e(tag, msg, e);
                break;
            case LEVEL_W:
                android.util.Log.w(tag, msg, e);
                break;
            case LEVEL_I:
                android.util.Log.i(tag, msg, e);
                break;
            case LEVEL_V:
                android.util.Log.v(tag, msg, e);
                break;
            case LEVEL_D:
                android.util.Log.d(tag, msg, e);
                break;
        }
    }
    
    private static void log4jMessage(int logType, String level, String tag, String msg) {

        if (BuildConfig.DEBUG) {
            return;
        }
        
//        if (logConfigurator == null) {
//            configureLogger();
//        }
        
        LEVEL tempLevel = null;
        if (level.equalsIgnoreCase("E") && USE_LEVEL_E == true) {
            tempLevel = LEVEL.LEVEL_E;
        } else if (level.equalsIgnoreCase("W") && USE_LEVEL_W == true) {
            tempLevel = LEVEL.LEVEL_W;
        } else if (level.equalsIgnoreCase("I") && USE_LEVEL_I == true) {
            tempLevel = LEVEL.LEVEL_I;
        } else if (level.equalsIgnoreCase("V") && USE_LEVEL_V == true) {
            tempLevel = LEVEL.LEVEL_V;
        } else if (level.equalsIgnoreCase("D") && USE_LEVEL_D == true) {
            tempLevel = LEVEL.LEVEL_D;
        } else {
            return;
        }
            
//        Logger Log4jTemp = null;
//        if (logType == LOG4J_CORE && GlobalVariables.USE_LOG_CORE) {
//            Log4jTemp = Log4jCore;
//        } else if (logType == LOG4J_ENGINE && GlobalVariables.USE_LOG_ENGINE) {
//            Log4jTemp = Log4jEngine;
//        } else if (logType == LOG4J_UI && GlobalVariables.USE_LOG_UI) {
//            Log4jTemp = Log4jUI;
//        } else {
//            return;
//        }

//        msg = tag + "::" + msg;
        
        switch (tempLevel) {
            case LEVEL_E:
    //            Log4jTemp.error(msg);
                android.util.Log.e(tag, msg);
                break;
            case LEVEL_W:
    //            Log4jTemp.warn(msg);
                android.util.Log.w(tag, msg);
                break;
            case LEVEL_I:
    //            Log4jTemp.info(msg);
                android.util.Log.i(tag, msg);
                break;
            case LEVEL_V:
    //            Log4jTemp.info(msg);
                android.util.Log.v(tag, msg);
                break;
            case LEVEL_D:
    //            Log4jTemp.debug(msg);
                android.util.Log.d(tag, msg);
                break;
        }
    }    

    private static void printStackTrace(String tag, StackTraceElement[] stack,
            LEVEL level) {

        if (BuildConfig.DEBUG) {
            return;
        }

        for (StackTraceElement element : stack) {
            if (LEVEL.LEVEL_I == level) {
                i(tag, "    at " + element.toString());
            } else if (LEVEL.LEVEL_D == level) {
                d(tag, "    at " + element.toString());
            } else if (LEVEL.LEVEL_W == level) {
                w(tag, "    at " + element.toString());
            } else if (LEVEL.LEVEL_E == level) {
                e(tag, "    at " + element.toString());
            } else if (LEVEL.LEVEL_V == level) {
                v(tag, "    at " + element.toString());
            }
        }
    }

    private static String getFuncName(int index) {

        String tag = null;

        Throwable th = new Throwable();
        StackTraceElement[] stack = th.getStackTrace();
        if (stack[index] != null) {
            tag = stack[index].getClassName();
            int last = tag.lastIndexOf('.') + 1;
            tag = tag.substring(last, tag.length());
            tag += "::";
            tag += stack[index].getMethodName();
        } else {
            printStackTrace(TAG, stack, LEVEL.LEVEL_E);
        }

        return tag;
    }

    private static boolean isContainTag(String tag) {
        boolean isContain = true;

        for (int i = 0; i < mLogClass.length; i++) {
            if (mLogClass[i].equals(tag)) {
                isContain = true;
                break;
            }
        }

        return isContain;
    }

    public static int wtf(String tag, String msg) {
        return android.util.Log.wtf(tag, msg);
    }
    
    public static int wtf(String tag, Throwable tr) {
        return android.util.Log.wtf(tag, tr);
    }
    
    public static int wtf(String tag, String msg, Throwable tr) {
        return android.util.Log.wtf(tag, msg, tr);
    }
}
