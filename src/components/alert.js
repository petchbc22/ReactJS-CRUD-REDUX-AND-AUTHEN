import React, { useState, useEffect } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
export const AlertNotifications = (props) => {
  const { showAlert, closeFnc, nextFnc, typeAlert, propstitle, ...otherprops } = props
  const [component, setComponent] = useState(<div></div>)

  useEffect(() => {
    if (typeAlert) {
      if (typeAlert === "create") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title={propstitle ? propstitle : "ยืนยันการบันทึก ?"}
              show={showAlert}
              showCancel
              custom
              customIcon={
                <div className="my-2">
                  <HelpCircle className="vx-icon w-100 " size={90} color={"#ff9630"} />
                </div>
              }
              reverseButtons
              confirmBtnText="ยืนยัน"
              cancelBtnText="ยกเลิก"
              onConfirm={() => {
                closeFnc()
                nextFnc(typeAlert)
              }}
              onCancel={() => {
                closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      }
    }
  }, [showAlert, typeAlert])

  return component
}
