/* ---------------------------------------------------------------------------- */
/* ---------------------------------  CONST  ---------------------------------- */
/* ---------------------------------------------------------------------------- */


const s = Snap(".svg-block"); // SVG-контейнер

let p1 = {x:40, y:264}; // кординаты точки 1
let p2 = {x:40, y:72}; // кординаты точки 2
let p3 = {x:296, y:72}; // кординаты точки 3
let p4 = {x:296, y:264}; // кординаты точки 4

const resetButton = document.getElementById("reset"); // кнопка RESET
const pathAttribute = document.getElementById("path_attribute"); // информация об атрибуте

const line1 = s.line(p1.x, p1.y, p2.x, p2.y); // Линия 1
const line2 = s.line(p4.x, p4.y, p3.x, p3.y); // Линия 2
const linesGroup = s.group(line1, line2); // группа линий 1 и 2

const path = s.path(`M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}`); // Кривая

const point1 = s.circle(p1.x, p1.y, 8).addClass("point1"); // Точка 1
const point4 = s.circle(p4.x, p4.y, 8).addClass("point4"); // Точка 4
const bigPointsGroup = s.group(point1, point4); // группа точек 1 и 4

const point2 = s.circle(p2.x, p2.y, 6).addClass("point2"); // Точка 2
const point3 = s.circle(p3.x, p3.y, 6).addClass("point3"); // Точка 3
const smallPointsGroup = s.group(point2, point3); // группа точек 2 и 3


// добавим стиль отображения линий 
linesGroup.attr({
    fill: "none",
    stroke: "#494b50",
    strokeWidth: 2
});

// добавим стиль отображения кривой
path.attr({
    fill: "none",
    stroke: "#4285F4",
    strokeWidth: 4
});

// добавим стиль отображения основных точек 1 и 4
bigPointsGroup.attr({
    fill: "#494b50"
});

// добавим стиль отображения направляющих точек 2 и 3
smallPointsGroup.attr({
    fill: "#ffffff",
    stroke: "#494b50",
	strokeWidth: 2,
});


/* ---------------------------------------------------------------------------- */
/* -------------------------------  FUNCTIONS  -------------------------------- */
/* ---------------------------------------------------------------------------- */


// отобразим начальные координаты кривой в DOM
pathAttribute.innerHTML = `Path d = "M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}"`;

// выполняем движение точки 1
const onMovePoint1 = (dx, dy) => {
	point1.attr({ cx: p1.x + dx, cy: p1.y + dy });
	line1.attr({x1: p1.x + dx, y1: p1.y + dy});
	path.attr({ d: `M ${p1.x + dx} ${p1.y + dy} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}` });
	pathAttribute.innerHTML = `Path d = "M ${p1.x + dx} ${p1.y + dy} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}"`;
};

// выполняем движение точки 2
const onMovePoint2 = (dx, dy) => {
	point2.attr({ cx: p2.x + dx, cy: p2.y + dy });
	line1.attr({x2: p2.x + dx, y2: p2.y + dy});
	path.attr({ d: `M ${p1.x} ${p1.y} C ${p2.x + dx} ${p2.y + dy}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}` });
	pathAttribute.innerHTML = `Path d = "M ${p1.x} ${p1.y} C ${p2.x + dx} ${p2.y + dy}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}"`;
};

// выполняем движение точки 3
const onMovePoint3 = (dx, dy) => {
	point3.attr({ cx: p3.x + dx, cy: p3.y + dy });
	line2.attr({x2: p3.x + dx, y2: p3.y + dy});
	path.attr({ d: `M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x + dx} ${p3.y + dy}, ${p4.x} ${p4.y}` });
	pathAttribute.innerHTML = `Path d = "M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x + dx} ${p3.y + dy}, ${p4.x} ${p4.y}"`;
};

// выполняем движение точки 4
const onMovePoint4 = (dx, dy) => {
	point4.attr({ cx: p4.x + dx, cy: p4.y + dy });
	line2.attr({x1: p4.x + dx, y1: p4.y + dy});
	path.attr({ d: `M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x + dx} ${p4.y + dy}` });
	pathAttribute.innerHTML = `Path d = "M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x + dx} ${p4.y + dy}"`;
};

// обновляем координаты после завершиния движения
const onEndPoint = () => {
	p1.x = + point1.attr('cx');
	p1.y = + point1.attr('cy');
	p2.x = + point2.attr('cx');
	p2.y = + point2.attr('cy');
	p3.x = + point3.attr('cx');
	p3.y = + point3.attr('cy');
	p4.x = + point4.attr('cx');
	p4.y = + point4.attr('cy');
}

// параметры сброса для кнопки RESET
const resetButtonClick = () => {
	const time = 100;
	// устанавливаем координаты по умолчанию
	p1 = {x:40, y:264};
	p2 = {x:40, y:72};
	p3 = {x:296, y:72};
	p4 = {x:296, y:264};
	// применяем координаты по умолчанию к объектам
	point1.animate({ cx: p1.x, cy: p1.y }, time);
	point2.animate({ cx: p2.x, cy: p2.y }, time);
	point3.animate({ cx: p3.x, cy: p3.y }, time);
	point4.animate({ cx: p4.x, cy: p4.y }, time);
	line1.animate({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }, time);
	line2.animate({ x1: p4.x, y1: p4.y, x2: p3.x, y2: p3.y }, time);
	path.animate({ d: `M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}` }, time);
	pathAttribute.innerHTML = `Path d = "M ${p1.x} ${p1.y} C ${p2.x} ${p2.y}, ${p3.x} ${p3.y}, ${p4.x} ${p4.y}"`;
};


/* ---------------------------------------------------------------------------- */
/* ---------------------------------  EVENTS  --------------------------------- */
/* ---------------------------------------------------------------------------- */


// отслеживаем события перемещения точек
point1.drag(onMovePoint1, onEndPoint);
point2.drag(onMovePoint2, onEndPoint);
point3.drag(onMovePoint3, onEndPoint);
point4.drag(onMovePoint4, onEndPoint);

// отслеживаем события нажатия на кнопку RESET
resetButton.addEventListener("click", resetButtonClick);