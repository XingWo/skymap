$(function () {
	/*地图载入*/
	var bounds = new L.LatLngBounds(new L.LatLng(-34, 90), new L.LatLng(-222, 422));
	var map = L.map('mapContainer', {
		crs: L.CRS.Simple,
		attributionControl: false,
		maxBounds: bounds,
		maxBoundsViscosity: 1.0,
	}).setView([-100,200], 2);
	var layer = L.tileLayer('assets/maps/{z}_{x}_{y}.png', {
		attribution: '&copy; David',
		minZoom: 2,
		maxZoom: 5,
		noWrap: true,
		bounds: bounds
	}).addTo(map);
	/*地图载入*/
  
	var cacheMarker = [];
	function refreshMarker(){
		$.each(cacheMarker, function () {
		  this.remove();
		});//清空cacheMarker内的标记，用于替换分类，刷新等等
		cacheMarker = [];
		/*从markerData导入定位标签*/
		$.each(markerData, function () {
	
			var key = this.id;	//批量导入必须有key
			var name = this.name;
			var starwo = this.star;
			if (localStorage.getItem(key)) {
			  starwo += "grey";
			}
			var popupHtml = '<div class="popupContainer">';
			popupHtml += '<h1 class="name">' + name + '</h1>';
			popupHtml += '<div class="buttonContainer">';
			popupHtml += '<span class="markButton" onclick="markPoint(this)" data-key="' + key + '">标记</span>';
			popupHtml += '|' +'<button class="markButton markButton'+ key +'" onclick="strategy(this)" data-key="' + key + '">攻略</button>';
			popupHtml += '</div>';popupHtml += '</div>';	//设置弹出框
			var className = "mark-" + key;
			
			className += " markIcon";
			className += " icon-" + name;
			/*图标设置*/
			
			var star = L.icon({
				iconUrl: 'assets/images/star.png',
				shadowUrl: 'assets/images/light.png',
				className: className,
				iconSize:     [11, 11], //图标大小
				shadowSize:   [25, 25], //图标背景/阴影大小
				iconAnchor:   [6, 6], // 图标对应标记位置（中心点即可）
				shadowAnchor: [13, 13],  // 阴影对应标记位置（中心点即可）
				popupAnchor:  [0,-15] // 弹出框对应位置
			});
			var star2 = L.icon({
				iconUrl: 'assets/images/greystar.png',
				shadowUrl: 'assets/images/night.png',
				className: className,
				iconSize:     [11, 11], //图标大小
				shadowSize:   [25, 25], //图标背景/阴影大小
				iconAnchor:   [6, 6], // 图标对应标记位置（中心点即可）
				shadowAnchor: [13, 13],  // 阴影对应标记位置（中心点即可）
				popupAnchor:  [0,-15] // 弹出框对应位置
			});
			/*图标设置*/
			if (starwo == 1) {
				var marker = L.marker([this.y, this.x], {
					icon: star,
				}).addTo(map).bindPopup(popupHtml);//设置标记
				cacheMarker.push(marker);
			} else{
				var marker = L.marker([this.y, this.x], {
					icon: star2,
				}).addTo(map).bindPopup(popupHtml);//设置标记
				cacheMarker.push(marker);
			}
			
		});
		/*从markerData导入定位标签*/
	}
	refreshMarker();
	
	
	/*刷新标签*/
	// setInterval(function () {
	// 	refreshMarker();
	// }, 500);
	/*刷新标签*/
	
	/*通过鼠标点击获取地图坐标*/
	var popup = L.popup();
	var cacheMarkerb = [];
	function onMapClick(e) {
		$.each(cacheMarkerb, function () {
		  this.remove();
		});//清空cacheMarkerb内的标记，用于替换分类，刷新等等
		cacheMarkerb = [];
		var nowmy = L.icon({
			iconUrl: 'assets/images/now.png',
			shadowUrl: 'assets/images/now.png',
			iconSize:     [35.7, 28.8], //图标大小
			shadowSize:   [35.7, 28.8], //图标背景/阴影大小
			iconAnchor:   [17.8, 14.4], // 图标对应标记位置（中心点即可）
			shadowAnchor: [17.8, 14.4],  // 阴影对应标记位置（中心点即可）
			popupAnchor:  [0,-15] // 弹出框对应位置
		});
		var marker = L.marker([e.latlng.lat, e.latlng.lng], {
			icon: nowmy,
		}).addTo(map);
		cacheMarkerb.push(marker);
	}
	
	map.on('click', onMapClick);
	/*通过鼠标点击获取地图坐标*/
});
	

/*菜单归位*/
function switchType(){
	$("#switchTypes").animate({scrollTop:0},300);
}/*菜单归位*/
//标记
function markPoint(element) {
	var that = $(element);
	var key = that.attr("data-key");
	var oldValue = localStorage.getItem(key);
	var newValue = !oldValue;
	localStorage.setItem(key, newValue ? "1" : "");
	$('#mapContainer .leaflet-marker-pane .mark-' + key).toggleClass("marked", newValue);
	if (newValue) {
		$('#mapContainer .leaflet-marker-pane .mark-' + key).attr("src", "assets/images/greystar.png");
		$('#mapContainer .leaflet-shadow-pane .mark-' + key).attr("src", "assets/images/night.png");
	} else{
		$('#mapContainer .leaflet-marker-pane .mark-' + key).attr("src", "assets/images/star.png");
		$('#mapContainer .leaflet-shadow-pane .mark-' + key).attr("src", "assets/images/light.png");
	}
};//标记


/*showhide按钮方案*/
function showhide(element){
	var that = $(element);
	var key = "showhide";
	var oldValue = localStorage.getItem(key);
	var newValue = !oldValue;
	localStorage.setItem(key, newValue ? "1" : "");
	if (newValue) {
		$(".showhide").css("transform", "rotate(90deg)");
		$('#mapContainer .leaflet-marker-pane').css({
			"display":"none",
		});
		$('#mapContainer .leaflet-shadow-pane').css({
			"display":"none",
		});
	} else{
		$(".showhide").css("transform", "rotate(0deg)");
		$('#mapContainer .leaflet-marker-pane').css({
			"display":"block",
		});
		$('#mapContainer .leaflet-shadow-pane').css({
			"display":"block",
		});
	}
};
$(document).ready(function() {
	var keystar = "showhide";
	var oldValue = localStorage.getItem(keystar);
	localStorage.setItem(keystar, oldValue ? "1" : "");
	if (oldValue) {
		$(".showhide").css("transform", "rotate(90deg)");
		$('#mapContainer .leaflet-marker-pane').css({
			"display":"none",
		});
		$('#mapContainer .leaflet-shadow-pane').css({
			"display":"none",
		});
	}
});/*showhide按钮方案*/
