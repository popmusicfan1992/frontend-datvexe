import React, {createElement, useEffect, useState} from "react";
import {Tabs, List, Rate, Comment, Tooltip, Avatar} from "antd";
import moment from "moment";
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from "@ant-design/icons";
import _ from "lodash";
import Slider from "react-slick";
import "../../Sass/css/Details.css";
import {getImgVehicleAction} from "../../redux/actions/bookingAction";
import {getCommentPassengerAction} from "../../redux/actions/commentAction";
import {useDispatch, useSelector} from "react-redux";
import LoadingSpin from "../Loading/LoadingSpin";
import {getTimePointTripAction} from "../../redux/actions/timePointAction";
const {TabPane} = Tabs;
function SampleNextArrow(props) {
	const {className, style, onClick} = props;
	return <div className={className} style={{...style, display: "block", background: "red"}} onClick={onClick} />;
}

function SamplePrevArrow(props) {
	const {className, style, onClick} = props;
	return <div className={className} style={{...style, display: "block", background: "green"}} onClick={onClick} />;
}
export default function Details(props) {
	const {listImageVehicle} = useSelector((state) => state.vehicleReducer);
	const {listCommentPassenger} = useSelector((state) => state.CommentReducer);
	console.log("file: Details.js ~ line 26 ~ Details ~ listCommentPassenger", listCommentPassenger);
	const {timePointTrip} = useSelector((state) => state.timePointReducer);
	const {isLoadingSpin} = useSelector((state) => state.LoadingReducer);
	console.log("timePointTrip", timePointTrip);
	console.log(props.tripPassenger);
	const dispatch = useDispatch();
	const renderImg = () => {
		return listImageVehicle?.map((item, index) => {
			return (
				<div key={index}>
					<img src={item.link} alt />
				</div>
			);
		});
	};

	const renderComment = () => {
		return listCommentPassenger?.map((item, index) => {
			let arrAllRate = item.userComment.userRate.filter((rate) => rate.passengerId == item.passengerId);
			let rate = 0;
			if (arrAllRate.length > 0) {
				rate = _.meanBy(arrAllRate, (rate) => rate.numberRate);
			}
			return (
				<Comment
					author={
						<a>
							{item.userComment.name}
							<div>{rate == 0 ? <p>Kh??ng c?? ????nh gi??</p> : <Rate disabled defaultValue={rate} style={{fontSize: 10}} />}</div>
						</a>
					}
					avatar={<Avatar src={item.userComment.avatar} alt={item.userComment.name} />}
					content={<p>{item.content}</p>}
					datetime={
						<Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
							<span>{moment().fromNow()}</span>
						</Tooltip>
					}
				/>
			);
		});
	};

	const renderPoint = (type) => {
		return timePointTrip
			.filter((timepoint) => timepoint.type == type)
			.map((item, index) => {
				return (
					<div className="group-item">
						<span className="time font-bold" style={{fontSize: 12}}>
							{item.time}
						</span>
						<span className="name"> ??? {item.point.name}</span>
					</div>
				);
			});
	};

	const data = [
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1610093076560.png" alt="Kh??? tr??ng xe" width={32} height={32} className="mr-2" />
					<div className="name">An to??n m??a covid</div>
				</div>
			),
			description: (
				<div className="description">
					L?? ch????ng tr??nh b???o v??? an to??n cho h??nh kh??ch s??? d???ng d???ch v??? c???a VeXeRe trong m??a d???ch Covid. VeXeRe ?????ng h??nh c??c nh?? xe ?????i t??c tri???n khai bi???n ph??p b???o v??? an to??n cho h??nh kh??ch, nh?? sau: (1) Ki???m tra th??n nhi???t h??nh kh??ch tr?????c khi l??n xe
					<br />
					(2) Trang b??? n?????c r???a tay;
					<br />
					(3) C?? ?????m b???o khuy???n c??o t???t c??? h??nh kh??ch ??eo kh???u trang khi l??n xe; (4) C?? th???c hi???n kh??? tr??ng xe
					<br />
					(5) T??i x??? v?? nh??n vi??n ???? ???????c ti??m v???c xin
				</div>
			),
		},
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1609837962216.png" alt="Kh??? tr??ng xe" width={32} height={32} className="mr-2" />
					<div className="name">Kh??? tr??ng xe</div>
				</div>
			),
			description: <div className="description">Nh?? xe c?? th???c hi???n phun kh??? tr??ng Nano B???c l??n xe nh???m b???o v??? an to??n cho h??nh kh??ch m??a Covid</div>,
		},
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1609837921462.png" alt="Kh??? tr??ng xe" width={32} height={32} className="mr-2" />
					<div className="name">N?????c r???a tay</div>
				</div>
			),
			description: <div className="description">Nh?? xe c?? trang b??? n?????c r???a tay di???t khu???n tr?????c khi l??n xe v?? trong xe</div>,
		},
		{
			title: (
				<div className="img-name flex items-center">
					<img src="https://static.vexere.com/production/utilities/1609837906714.png" alt="Kh??? tr??ng xe" width={32} height={32} className="mr-2" />
					<div className="name">??o th??n nhi???t</div>
				</div>
			),
			description: <div className="description">H??nh kh??ch s??? ???????c ??o th??n nhi???t tr?????c khi l??n xe ????? x??c ?????nh kh??ng nghi nhi???m/ lan truy???n vi r??t Covid cho h??nh kh??ch kh??c.</div>,
		},
	];
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div className="details">
			<Tabs
				defaultActiveKey="1"
				centered
				onChange={(e) => {
					if (e == 5) {
						dispatch(getCommentPassengerAction(props.tripPassenger.passengerId));
					} else if (e == 3) {
						dispatch(getTimePointTripAction(props.tripPassenger.id));
					}
				}}
			>
				<TabPane tab="H??nh ???nh" key="1">
					{isLoadingSpin ? <LoadingSpin /> : <Slider {...settings}>{renderImg()}</Slider>}
				</TabPane>
				<TabPane tab="Ti???n ??ch" key="2">
					<List
						itemLayout="horizontal"
						dataSource={data}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta title={<a href="https://ant.design">{item.title}</a>} description={item.description} />
							</List.Item>
						)}
					/>
				</TabPane>
				<TabPane tab="??i???m ????n tr???" key="3" className="from-start">
					{isLoadingSpin ? (
						<LoadingSpin />
					) : (
						<>
							<div className="ant-row header">
								<div className="note">L??u ??</div>
								<div className="header-content">C??c m???c th???i gian ????n, tr??? b??n d?????i l?? th???i gian d??? ki???n. L???ch n??y c?? th??? thay ?????i t??y t??nh h??nh th??c t???.</div>
							</div>
							<div className="grid grid-cols-2 text-center">
								<div>
									<div className="content-title font-bold text-sm">??i???m ????n</div>
									<div className="group">{renderPoint("pickup")}</div>
								</div>
								<div>
									<div className="content-title font-bold text-sm">??i???m tr???</div>
									<div className="group">{renderPoint("dropoff")}</div>
								</div>
							</div>
						</>
					)}
				</TabPane>
				<TabPane tab="Ch??nh s??ch" key="4">
					<div className="policy undefined">
						<p className="title font-bold text-xl">Ch??nh s??ch h???y v??</p>
						<div className="cancel_policy">
							<div className="cancellation-timeline">
								<div className="cancellation-policy-period w-full">
									<div style={{background: "rgb(0, 96, 196)"}} />
									<p>Kh??ng m???t ph??</p>
								</div>
								<div className="mark" style={{left: "calc(33.3333% - 33px)"}}>
									<strong>{props.tripPassenger.startTime}</strong>
									<span>{moment(props?.start).format("DD-MM-YYYY")}</span>
								</div>
								<div className="cancellation-policy-period">
									<div style={{background: "rgb(255, 199, 0)"}} />
									<p>Ph?? h???y 20%</p>
								</div>
								<div className="mark" style={{left: "calc(66.6667% - 33px)"}}>
									<strong>{props.tripPassenger.endTime}</strong>
									<span>{moment(props?.start).format("DD-MM-YYYY")}</span>
								</div>
								<div className="cancellation-policy-period w-full">
									<div style={{background: "rgb(241, 0, 0)"}} />
									<p>Ph?? h???y 100%</p>
								</div>
							</div>
							<div className="departure">Kh???i h??nh</div>
							<div className="circle" />
							<div className="circle today" />
						</div>
						<div className="note">
							<strong>Ghi Ch?? : </strong>Ph?? hu??? s??? ???????c t??nh tr??n gi?? g???c, kh??ng gi???m tr??? khuy???n m??i ho???c gi???m gi??; ?????ng th???i kh??ng v?????t qu?? s??? ti???n qu?? kh??ch ???? thanh to??n.
						</div>
					</div>
				</TabPane>
				<TabPane tab="????nh gi??" key="5" className="review">
					{isLoadingSpin ? (
						<LoadingSpin />
					) : (
						<>
							<div className="rating">
								<div className="overall-rating">
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span>{props.avgRate}</span>
								</div>
								<Rate allowClear={false} defaultValue={props.avgRate} disabled />
								<span className="ant-rate-text">{props.passenger?.passengerRate.length} ????nh gi??</span>
							</div>
							<div className="ant-row filter-rate">
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter active" ant-click-animating-without-extra-node="false">
									<span>T???t c??? ({listCommentPassenger?.length == 0 ? 0 : listCommentPassenger?.length})</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter " ant-click-animating-without-extra-node="false">
									<span>C?? nh???n x??t ({listCommentPassenger?.length == 0 ? 0 : listCommentPassenger?.length})</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter " ant-click-animating-without-extra-node="false">
									<span>5</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(91)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>4</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(13)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>3</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(5)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>2</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(0)</span>
								</button>
								<button type="button" className="ant-btn Reviews__ButtonFilter-sc-1uhksgp-1 lmFGPV button-filter ">
									<span>1</span>
									<i aria-label="icon: star" className="anticon anticon-star">
										<svg viewBox="64 64 896 896" className data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
											<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
										</svg>
									</i>
									<span className="review-count">(1)</span>
								</button>
							</div>
							<div>{renderComment()}</div>
						</>
					)}
				</TabPane>
			</Tabs>
		</div>
	);
}
