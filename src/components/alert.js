import React, { useState, useEffect } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
// import "../../../assets/scss/custom-css/custom.scss"
import { HelpCircle, User } from "react-feather"
export const Alert = (props) => {
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
              confirmBtnCssClass="custombtinmodal"
              cancelBtnCssClass="custombtCancel"
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
      } else if (typeAlert === "import") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title="ยืนยันการนำเข้าข้อมูล ?"
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
              confirmBtnCssClass="custombtinmodal"
              cancelBtnCssClass="custombtCancel"
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
      } else if (typeAlert === "edit") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title="ยืนยันการแก้ไข?"
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
              confirmBtnCssClass="custombtinmodal"
              cancelBtnCssClass="custombtCancel"
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
      } else if (typeAlert === "delete") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title={`Comfirm Delete id = ${props.id}`}
              show={showAlert}
              showCancel
              custom
              customIcon={
                <div className="my-2">
                  <HelpCircle className="vx-icon w-100 " size={90} color={"#ff9630"} />
                </div>
              }
              reverseButtons
              confirmBtnText="ลบ"
              cancelBtnText="ยกเลิก"
              confirmBtnCssClass="custombtinmodal"
              cancelBtnCssClass="custombtCancel"
              onConfirm={() => {
                closeFnc()
                if (typeAlert) nextFnc(typeAlert)
              }}
              onCancel={() => {
                closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } else if (typeAlert === "success") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title={propstitle}
              success
              show={showAlert}
              confirmBtnText="ปิด"
              confirmBtnCssClass="custombtinmodal"
              onConfirm={() => {
                closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } else if (typeAlert === "warning") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title={propstitle}
              warning
              show={showAlert}
              confirmBtnText="ปิด"
              confirmBtnCssClass="custombtinmodal"
              onConfirm={() => {
                closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } else if (typeAlert === "error") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title={propstitle}
              error
              show={showAlert}
              confirmBtnText="ปิด"
              confirmBtnCssClass="custombtinmodal"
              onConfirm={() => {
                closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } else if (typeAlert === "confirm") {
        let componentTemp = component
        componentTemp = (
          <div>
            <SweetAlert
              title={propstitle}
              show={showAlert}
              showCancel
              custom
              customIcon={
                <div className="my-2">
                  <HelpCircle className="vx-icon w-100 " size={90} color={"#ff9630"} />]
                </div>
              }
              reverseButtons
              confirmBtnText={otherprops.confirmBtnText}
              cancelBtnText={otherprops.cancelBtnText}
              confirmBtnCssClass="custombtinmodal"
              cancelBtnCssClass="custombtCancel"
              onConfirm={() => {
                closeFnc()
                if (typeAlert) nextFnc(typeAlert)
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
