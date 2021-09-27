import React, { useState, useEffect } from "react"
import SweetAlert from "react-bootstrap-sweetalert"
// import "../../../assets/scss/custom-css/custom.scss"
import { HelpCircle } from "react-feather"
export const Alert = (props) => {
  const [component, setComponent] = useState(null)
  let componentTemp = null
  useEffect(() => {
    let componentTemp = null
    if (props.typeAlert) {
      if (props.typeAlert === "create") {
        
        componentTemp = (
          <div>
            <SweetAlert
              title={"Comfirmation Create ?"}
              show={props.showAlert}
              showCancel
              custom
              customIcon={
                <div className="my-2">
                  <HelpCircle className="vx-icon w-100 " size={90} color={"#ff9630"} />
                </div>
              }
              reverseButtons
              confirmBtnText="Comfirm"
              cancelBtnText="Cancel"
              confirmBtnCssClass="custombtinmodal"
              cancelBtnCssClass="custombtCancel"
              onConfirm={() => {
                props.closeFnc()
                props.nextFnc(props.typeAlert)
              }}
              onCancel={() => {
                props.closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } else if (props.typeAlert === "edit") {
        
        componentTemp = (
          <div>
            <SweetAlert
              title="Comfirmation Update ?"
              show={props.showAlert}
              showCancel
              custom
              customIcon={
                <div className="my-2">
                  <HelpCircle className="vx-icon w-100 " size={90} color={"#ff9630"} />
                </div>
              }
              reverseButtons
              confirmBtnText="Comfirm"
              cancelBtnText="Cancel"
              confirmBtnCssClass="custombtinmodal"
              cancelBtnCssClass="custombtCancel"
              onConfirm={() => {
                props.closeFnc()
                props.nextFnc(props.typeAlert)
              }}
              onCancel={() => {
                props.closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } else if (props.typeAlert === "delete") {
        
        componentTemp = (
          <div>
            <SweetAlert
                //  customClass="font-1_375em"
              title={`Comfirm Delete movie id = ${props.id} ?`}
              show={props.showAlert}
              showCancel
         
              custom
              customIcon={
                <div className="my-2">
                  <HelpCircle className="vx-icon w-100 " size={90} color={"#ff9630"} />
                </div>
              }
              reverseButtons
              confirmBtnText="Delete"
              cancelBtnText="Cancel"
              confirmBtnBsStyle="danger"
              cancelBtnCssClass="custombtCancel"
              onConfirm={() => {
                props.closeFnc()
                if (props.typeAlert) props.nextFnc(props.typeAlert)
              }}
              onCancel={() => {
                props.closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } else if (props.typeAlert === "success") {
        
        componentTemp = (
          <div>
            <SweetAlert
              title={'Success'}
              success
              show={props.showAlert}
              confirmBtnText="Close"
              confirmBtnCssClass="custombtinmodal"
              onConfirm={() => {
                props.closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      }  else if (props.typeAlert === "error") {
        
        componentTemp = (
          <div>
            <SweetAlert
              title={props.propstitle}
              error
              show={props.showAlert}
              confirmBtnText="Close"
              confirmBtnCssClass="custombtinmodal"
              onConfirm={() => {
                props.closeFnc()
              }}
            ></SweetAlert>
          </div>
        )
        setComponent(componentTemp)
      } 
    }
  }, [props,componentTemp])

  return component
}
