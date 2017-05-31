package com.reactcalculator.custom;

import android.content.Context;
import android.graphics.drawable.BitmapDrawable;
import android.support.annotation.LayoutRes;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.reactcalculator.R;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Surajit Sarkar on 31/5/17.
 * Company : Bitcanny Technologies Pvt. Ltd.
 * Email   : surajit@bitcanny.com
 */

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private static PopupWindow popupWindow;

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration){
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    /*@ReactMethod
    public void show(String message){
        show(message, Toast.LENGTH_SHORT);
    }*/

    public void showPopupMessage(String dialogText, final Callback onCallback, final Callback cancelCallback){
        if(popupWindow!=null){
            return;
        }
        popupWindow = showPopupWindow(getReactApplicationContext(), dialogText, "OK", "Cancel", new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        onCallback.invoke();
                    }
                },
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        popupWindow.dismiss();
                        cancelCallback.invoke();
                    }
                });
    }

    public PopupWindow showPopupWindow(Context context,
                                       String dialogText,
                                       String positiveString, String negativeString,
                                       View.OnClickListener positiveCallback,
                                       View.OnClickListener negativeCallback){
        PopupWindow popupWindow = getPopupWindow(context, R.layout.list_item_delete_popup);
        popupWindow.setOutsideTouchable(false);
        View view1 = popupWindow.getContentView();
        TextView title = (TextView)view1.findViewById(R.id.txt_heading);
        TextView btn_yes = (TextView)view1.findViewById(R.id.cancel);
        TextView btn_no = (TextView)view1.findViewById(R.id.no);
        title.setText(dialogText);
        if(positiveString!=null)
            btn_yes.setText(positiveString);
        if(negativeString!=null) {
            btn_no.setVisibility(View.VISIBLE);
            btn_no.setText(negativeString);
        }
        else{
            btn_no.setVisibility(View.GONE);
        }
        if(positiveCallback!=null)
            btn_yes.setOnClickListener(positiveCallback);
        if(negativeCallback!=null)
            btn_no.setOnClickListener(negativeCallback);
        return popupWindow;
    }

    private PopupWindow getPopupWindow(Context context, @LayoutRes int layoutRes){
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View layout = inflater.inflate(layoutRes, null);
        PopupWindow pwindo = new PopupWindow(layout, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, true);
        pwindo.setAnimationStyle(R.style.animationName);
        pwindo.showAtLocation(layout, Gravity.CENTER, 0, 0);
        pwindo.setOutsideTouchable(true);
        pwindo.setFocusable(true);
        pwindo.setBackgroundDrawable(new BitmapDrawable());
        pwindo.setTouchable(true);
        pwindo.setFocusable(false);
        pwindo.setOutsideTouchable(false);
        return pwindo;
    }
}
