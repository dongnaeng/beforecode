import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
        ,phone:'',
        address: '',
        addressdetail: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('이름을 반드시 입력해주세요'),
        email: Yup.string()
          .email('이메일 형식이 틀렸습니다.')
          .required('이메일을 반드시 입력해주세요'),
        password: Yup.string()
          .min(6, '6글자 이상의 비밀번호를 설정해주세요.')
          .required('비밀번호를 반드시 입력해주세요'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('비밀번호 확인을 반드시 입력해주세요'),
        phone:Yup.string()
        .required('전화번호를 반드시 입력해주세요'),
        address: Yup.string()
          .required('주소를 반드시 입력해주세요'),
          addressdetail: Yup.string()
          .required('상세주소를 반드시 입력해주세요')

      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            phone: values.phone,
            address: values.address,
            addressdetail: values.addressdetail,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app" >

            <br/><br/><br/><br/><br/><br/>

            <h2> 동네냉장고 회원가입</h2>
            <Form style={{maxWidth:"400px", width:"80%" }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름을 입력하세요."
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

          
            



              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="아이디처럼 사용될 이메일을 입력하세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호를 똑같이 입력해 주세요."
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item required label="전화번호">
              01022223333 형태로 입력해 주세요
                <Input
                  id="phone"
                  placeholder="정확한 전화번호를 입력하세요."
                  type="text"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phone && touched.phone ? 'text-input error' : 'text-input'
                  }
                />
                {errors.phone && touched.phone && (
                  <div className="input-feedback">{errors.phone}</div>
                )}
              </Form.Item>
             

              <Form.Item required label="주소">
                <Input
                  id="address"
                  placeholder="ex) 서울특별시 관악구 관악로 158"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.address && touched.address ? 'text-input error' : 'text-input'
                  }
                />
                {errors.address && touched.address && (
                  <div className="input-feedback">{errors.address}</div>
                )}
              </Form.Item>

              <Form.Item required label="상세주소">
                <Input
                  id="addressdetail"
                  placeholder="ex) bs 타워 2층 201호"
                  type="text"
                  value={values.addressdetail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.addressdetail && touched.paddressdetailone ? 'text-input error' : 'text-input'
                  }
                />
                {errors.addressdetail && touched.addressdetail && (
                  <div className="input-feedback">{errors.addressdetail}</div>
                )}
              </Form.Item>




              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting} style={{ background: "#ffa000", borderColor: "#ffa001" }}>
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
