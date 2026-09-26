export type TaskLocale = "en" | "ru" | "ro";

export type BeginTask = {
	id: string;
	number: number;
	text: Record<TaskLocale, string>;
	stdin: string;
	starter: string;
};

export const TASK_LOCALES: { id: TaskLocale; label: string }[] = [
	{ id: "en", label: "English" },
	{ id: "ru", label: "Русский" },
	{ id: "ro", label: "Română" },
];

export const UI_TEXT: Record<
	TaskLocale,
	{
		tasks: string;
		task: string;
		description: string;
		reset: string;
		standard: string;
		stdinLabel: string;
		stdinPlaceholder: string;
	}
> = {
	en: {
		tasks: "Tasks",
		task: "Task",
		description: "Task text",
		reset: "Reset code",
		standard: "C++20",
		stdinLabel: "stdin",
		stdinPlaceholder: "Values for cin, space- or newline-separated",
	},
	ru: {
		tasks: "Задания",
		task: "Задание",
		description: "Текст задания",
		reset: "Сбросить код",
		standard: "C++20",
		stdinLabel: "ввод",
		stdinPlaceholder: "Значения для cin, через пробел или с новой строки",
	},
	ro: {
		tasks: "Sarcini",
		task: "Sarcina",
		description: "Textul sarcinii",
		reset: "Resetează codul",
		standard: "C++20",
		stdinLabel: "stdin",
		stdinPlaceholder: "Valori pentru cin, separate prin spațiu sau linie nouă",
	},
};

const HEAD = `#include <iostream>
using namespace std;
`;

export const BEGIN_TASKS: BeginTask[] = [
	{
		id: "Begin1",
		number: 1,
		text: {
			en: "Given the side a of a square, find its perimeter P = 4·a.",
			ru: "Дана сторона квадрата a. Найти его периметр P = 4·a.",
			ro: "Se dă latura a a unui pătrat. Aflați perimetrul P = 4·a.",
		},
		stdin: "3\n",
		starter: `${HEAD}
int main() {
    double a;
    cin >> a;

    // TODO: Begin1 — compute P = 4*a
    double P = 0; // <-- your code here

    cout << P;
    return 0;
}
`,
	},
	{
		id: "Begin2",
		number: 2,
		text: {
			en: "Given the side a of a square, find its area S = a².",
			ru: "Дана сторона квадрата a. Найти его площадь S = a².",
			ro: "Se dă latura a a unui pătrat. Aflați aria S = a².",
		},
		stdin: "3\n",
		starter: `${HEAD}
int main() {
    double a;
    cin >> a;

    // TODO: Begin2 — compute S = a*a
    double S = 0; // <-- your code here

    cout << S;
    return 0;
}
`,
	},
	{
		id: "Begin3",
		number: 3,
		text: {
			en: "Given the sides a and b of a rectangle, find its area S = a·b and perimeter P = 2·(a + b).",
			ru: "Даны стороны прямоугольника a и b. Найти его площадь S = a·b и периметр P = 2·(a + b).",
			ro: "Se dau laturile a și b ale unui dreptunghi. Aflați aria S = a·b și perimetrul P = 2·(a + b).",
		},
		stdin: "3 4\n",
		starter: `${HEAD}
int main() {
    double a, b;
    cin >> a >> b;

    // TODO: Begin3 — compute S = a*b, P = 2*(a+b)
    double S = 0; // <-- your code here
    double P = 0; // <-- your code here

    cout << S << "\\n" << P;
    return 0;
}
`,
	},
	{
		id: "Begin4",
		number: 4,
		text: {
			en: "Given the diameter d of a circle, find its length L = π·d. Use 3.14 for π.",
			ru: "Дан диаметр окружности d. Найти ее длину L = π·d. В качестве значения π использовать 3.14.",
			ro: "Se dă diametrul d al unui cerc. Aflați lungimea L = π·d. Folosiți 3,14 pentru π.",
		},
		stdin: "2\n",
		starter: `${HEAD}
int main() {
    double d;
    cin >> d;

    // TODO: Begin4 — compute L = pi*d, pi = 3.14
    const double pi = 3.14;
    double L = 0; // <-- your code here

    cout << L;
    return 0;
}
`,
	},
	{
		id: "Begin5",
		number: 5,
		text: {
			en: "Given the edge a of a cube, find its volume V = a³ and surface area S = 6·a².",
			ru: "Дана длина ребра куба a. Найти объем куба V = a³ и площадь его поверхности S = 6·a².",
			ro: "Se dă muchia a a unui cub. Aflați volumul V = a³ și aria suprafeței S = 6·a².",
		},
		stdin: "3\n",
		starter: `${HEAD}
int main() {
    double a;
    cin >> a;

    // TODO: Begin5 — compute V = a^3, S = 6*a^2
    double V = 0; // <-- your code here
    double S = 0; // <-- your code here

    cout << V << "\\n" << S;
    return 0;
}
`,
	},
	{
		id: "Begin6",
		number: 6,
		text: {
			en: "Given the edges a, b, c of a rectangular box, find its volume V = a·b·c and surface area S = 2·(a·b + b·c + a·c).",
			ru: "Даны длины ребер a, b, c прямоугольного параллелепипеда. Найти его объем V = a·b·c и площадь поверхности S = 2·(a·b + b·c + a·c).",
			ro: "Se dau muchiile a, b, c ale unui paralelipiped dreptunghic. Aflați volumul V = a·b·c și aria S = 2·(a·b + b·c + a·c).",
		},
		stdin: "2 3 4\n",
		starter: `${HEAD}
int main() {
    double a, b, c;
    cin >> a >> b >> c;

    // TODO: Begin6 — compute V = a*b*c, S = 2*(a*b + b*c + a*c)
    double V = 0; // <-- your code here
    double S = 0; // <-- your code here

    cout << V << "\\n" << S;
    return 0;
}
`,
	},
	{
		id: "Begin7",
		number: 7,
		text: {
			en: "Given the radius R of a circle, find its length L = 2·π·R and area S = π·R². Use 3.14 for π.",
			ru: "Найти длину окружности L и площадь круга S заданного радиуса R: L = 2·π·R, S = π·R². В качестве значения π использовать 3.14.",
			ro: "Se dă raza R a unui cerc. Aflați lungimea L = 2·π·R și aria S = π·R². Folosiți 3,14 pentru π.",
		},
		stdin: "3\n",
		starter: `${HEAD}
int main() {
    double R;
    cin >> R;

    // TODO: Begin7 — compute L = 2*pi*R, S = pi*R*R, pi = 3.14
    const double pi = 3.14;
    double L = 0; // <-- your code here
    double S = 0; // <-- your code here

    cout << L << "\\n" << S;
    return 0;
}
`,
	},
	{
		id: "Begin8",
		number: 8,
		text: {
			en: "Given two numbers a and b, find their average: (a + b) / 2.",
			ru: "Даны два числа a и b. Найти их среднее арифметическое: (a + b) / 2.",
			ro: "Se dau două numere a și b. Aflați media aritmetică: (a + b) / 2.",
		},
		stdin: "3 7\n",
		starter: `${HEAD}
int main() {
    double a, b;
    cin >> a >> b;

    // TODO: Begin8 — compute average = (a+b)/2
    double avg = 0; // <-- your code here

    cout << avg;
    return 0;
}
`,
	},
	{
		id: "Begin9",
		number: 9,
		text: {
			en: "Given two non-negative numbers a and b, find their geometric mean: √(a·b).",
			ru: "Даны два неотрицательных числа a и b. Найти их среднее геометрическое, т.е. квадратный корень из их произведения: √(a·b).",
			ro: "Se dau două numere nenegative a și b. Aflați media geometrică: √(a·b).",
		},
		stdin: "4 9\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double a, b;
    cin >> a >> b;

    // TODO: Begin9 — compute sqrt(a*b)
    double g = 0; // <-- your code here, use sqrt

    cout << g;
    return 0;
}
`,
	},
	{
		id: "Begin10",
		number: 10,
		text: {
			en: "Given two non-zero numbers, find the sum, difference, product and quotient of their squares.",
			ru: "Даны два ненулевых числа. Найти сумму, разность, произведение и частное их квадратов.",
			ro: "Se dau două numere nenule. Aflați suma, diferența, produsul și câtul pătratelor lor.",
		},
		stdin: "3 2\n",
		starter: `${HEAD}
int main() {
    double a, b;
    cin >> a >> b;

    // TODO: Begin10 — use a2 = a*a, b2 = b*b, then sum/diff/prod/quotient
    double a2 = 0; // <-- your code here
    double b2 = 0; // <-- your code here
    double sum = 0, diff = 0, prod = 0, quot = 0; // <-- your code here

    cout << sum << "\\n" << diff << "\\n" << prod << "\\n" << quot;
    return 0;
}
`,
	},
	{
		id: "Begin11",
		number: 11,
		text: {
			en: "Given two non-zero numbers, find the sum, difference, product and quotient of their absolute values.",
			ru: "Даны два ненулевых числа. Найти сумму, разность, произведение и частное их модулей.",
			ro: "Se dau două numere nenule. Aflați suma, diferența, produsul și câtul valorilor absolute.",
		},
		stdin: "3 -4\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double a, b;
    cin >> a >> b;

    // TODO: Begin11 — use abs(a), abs(b), then sum/diff/prod/quotient
    double sum = 0, diff = 0, prod = 0, quot = 0; // <-- your code here

    cout << sum << "\\n" << diff << "\\n" << prod << "\\n" << quot;
    return 0;
}
`,
	},
	{
		id: "Begin12",
		number: 12,
		text: {
			en: "Given the legs a and b of a right triangle, find its hypotenuse c and perimeter P: c = √(a² + b²), P = a + b + c.",
			ru: "Даны катеты прямоугольного треугольника a и b. Найти его гипотенузу c и периметр P: c = √(a² + b²), P = a + b + c.",
			ro: "Se dau catetele a și b ale unui triunghi dreptunghic. Aflați ipotenuza c și perimetrul P: c = √(a² + b²), P = a + b + c.",
		},
		stdin: "3 4\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double a, b;
    cin >> a >> b;

    // TODO: Begin12 — c = sqrt(a*a + b*b), P = a+b+c
    double c = 0; // <-- your code here
    double P = 0; // <-- your code here

    cout << c << "\\n" << P;
    return 0;
}
`,
	},
	{
		id: "Begin13",
		number: 13,
		text: {
			en: "Given the radii R1 and R2 of two concentric circles (R1 > R2), find the areas S1, S2 and the ring area S3 = S1 − S2. S1 = π·R1², S2 = π·R2². Use 3.14 for π.",
			ru: "Даны радиусы R1 и R2 двух концентрических окружностей (R1 > R2). Найти площади кругов S1 и S2, а также площадь S3 кольца: S1 = π·(R1)², S2 = π·(R2)², S3 = S1 − S2. В качестве значения π использовать 3.14.",
			ro: "Se dau razele R1 și R2 ale două cercuri concentrice (R1 > R2). Aflați ariile S1, S2 și aria inelului S3 = S1 − S2. Folosiți 3,14 pentru π.",
		},
		stdin: "5 3\n",
		starter: `${HEAD}
int main() {
    double R1, R2;
    cin >> R1 >> R2;

    // TODO: Begin13 — S1 = pi*R1*R1, S2 = pi*R2*R2, S3 = S1-S2
    const double pi = 3.14;
    double S1 = 0, S2 = 0, S3 = 0; // <-- your code here

    cout << S1 << "\\n" << S2 << "\\n" << S3;
    return 0;
}
`,
	},
	{
		id: "Begin14",
		number: 14,
		text: {
			en: "Given the length L of a circumference, find the radius R and area S. L = 2·π·R, S = π·R². Use 3.14 for π.",
			ru: "Дана длина окружности L. Найти ее радиус R и площадь круга S: L = 2·π·R, S = π·R². В качестве значения π использовать 3.14.",
			ro: "Se dă lungimea L a unui cerc. Aflați raza R și aria S. L = 2·π·R, S = π·R². Folosiți 3,14 pentru π.",
		},
		stdin: "18.84\n",
		starter: `${HEAD}
int main() {
    double L;
    cin >> L;

    // TODO: Begin14 — R = L/(2*pi), S = pi*R*R
    const double pi = 3.14;
    double R = 0; // <-- your code here
    double S = 0; // <-- your code here

    cout << R << "\\n" << S;
    return 0;
}
`,
	},
	{
		id: "Begin15",
		number: 15,
		text: {
			en: "Given the area S of a circle, find the diameter D and length L. L = π·D, S = π·D²/4. Use 3.14 for π.",
			ru: "Дана площадь круга S. Найти его диаметр D и длину окружности L: L = π·D, S = π·D²/4. В качестве значения π использовать 3.14.",
			ro: "Se dă aria S a unui cerc. Aflați diametrul D și lungimea L. L = π·D, S = π·D²/4. Folosiți 3,14 pentru π.",
		},
		stdin: "28.26\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double S;
    cin >> S;

    // TODO: Begin15 — D = sqrt(4*S/pi), L = pi*D
    const double pi = 3.14;
    double D = 0; // <-- your code here, use sqrt
    double L = 0; // <-- your code here

    cout << D << "\\n" << L;
    return 0;
}
`,
	},
	{
		id: "Begin16",
		number: 16,
		text: {
			en: "Two points with coordinates x1 and x2 are given on the real axis. Find the distance between them: |x2 − x1|.",
			ru: "Найти расстояние между двумя точками с координатами x1 и x2 на числовой оси: |x2 − x1|.",
			ro: "Se dau coordonatele x1 și x2 ale două puncte de pe axa reală. Aflați distanța |x2 − x1|.",
		},
		stdin: "3 8\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double x1, x2;
    cin >> x1 >> x2;

    // TODO: Begin16 — distance = abs(x2-x1)
    double d = 0; // <-- your code here, use abs

    cout << d;
    return 0;
}
`,
	},
	{
		id: "Begin17",
		number: 17,
		text: {
			en: "Three points A, B, C are given on the real axis. Find the length of AC, the length of BC and their sum.",
			ru: "Даны три точки A, B, C на числовой оси. Найти длины отрезков AC и BC и их сумму.",
			ro: "Se dau trei puncte A, B, C pe axa reală. Aflați lungimile AC, BC și suma lor.",
		},
		stdin: "1 5 3\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: Begin17 — AC = abs(C-A), BC = abs(C-B), sum = AC+BC
    double AC = 0, BC = 0, sum = 0; // <-- your code here

    cout << AC << "\\n" << BC << "\\n" << sum;
    return 0;
}
`,
	},
	{
		id: "Begin18",
		number: 18,
		text: {
			en: "Three points A, B, C are given on the real axis, point C is located between A and B. Find the product AC·BC.",
			ru: "Даны три точки A, B, C на числовой оси. Точка C расположена между точками A и B. Найти произведение длин отрезков AC и BC.",
			ro: "Se dau trei puncte A, B, C pe axa reală, punctul C se află între A și B. Aflați produsul AC·BC.",
		},
		stdin: "1 5 3\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: Begin18 — AC = abs(C-A), BC = abs(B-C), product = AC*BC
    double prod = 0; // <-- your code here

    cout << prod;
    return 0;
}
`,
	},
	{
		id: "Begin19",
		number: 19,
		text: {
			en: "The coordinates (x1, y1) and (x2, y2) of opposite vertices of a rectangle are given. Its sides are parallel to the axes. Find its perimeter and area.",
			ru: "Даны координаты двух противоположных вершин прямоугольника: (x1, y1), (x2, y2). Стороны прямоугольника параллельны осям координат. Найти его периметр и площадь.",
			ro: "Se dau coordonatele (x1, y1) și (x2, y2) ale două vârfuri opuse ale unui dreptunghi cu laturile paralele cu axele. Aflați perimetrul și aria.",
		},
		stdin: "1 1 4 5\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: Begin19 — w = abs(x2-x1), h = abs(y2-y1), P = 2*(w+h), S = w*h
    double P = 0, S = 0; // <-- your code here

    cout << P << "\\n" << S;
    return 0;
}
`,
	},
	{
		id: "Begin20",
		number: 20,
		text: {
			en: "The coordinates (x1, y1) and (x2, y2) of two points are given. Find the distance: √((x2−x1)² + (y2−y1)²).",
			ru: "Найти расстояние между двумя точками с координатами (x1, y1) и (x2, y2): √((x2−x1)² + (y2−y1)²).",
			ro: "Se dau coordonatele (x1, y1) și (x2, y2) ale două puncte. Aflați distanța √((x2−x1)² + (y2−y1)²).",
		},
		stdin: "0 0 3 4\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: Begin20 — distance = sqrt((x2-x1)^2 + (y2-y1)^2)
    double d = 0; // <-- your code here, use sqrt

    cout << d;
    return 0;
}
`,
	},
	{
		id: "Begin21",
		number: 21,
		text: {
			en: "The coordinates (x1, y1), (x2, y2), (x3, y3) of triangle vertices are given. Find its perimeter and area using Heron formula S = √(p·(p−a)·(p−b)·(p−c)), p = (a+b+c)/2.",
			ru: "Даны координаты вершин треугольника: (x1, y1), (x2, y2), (x3, y3). Найти его периметр и площадь, используя формулу расстояния (см. Begin20). Площадь по формуле Герона: S = √(p·(p−a)·(p−b)·(p−c)), где p = (a+b+c)/2 — полупериметр.",
			ro: "Se dau vârfurile (x1, y1), (x2, y2), (x3, y3) ale unui triunghi. Aflați perimetrul și aria cu formula lui Heron S = √(p·(p−a)·(p−b)·(p−c)), p = (a+b+c)/2.",
		},
		stdin: "0 0 3 0 0 4\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double x1, y1, x2, y2, x3, y3;
    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;

    // TODO: Begin21 — sides a,b,c via distance, P = a+b+c, p = P/2, S = sqrt(p*(p-a)*(p-b)*(p-c))
    double P = 0; // <-- your code here
    double S = 0; // <-- your code here

    cout << P << "\\n" << S;
    return 0;
}
`,
	},
	{
		id: "Begin22",
		number: 22,
		text: {
			en: "Exchange the values of two given variables A and B. Output the new values of A and B.",
			ru: "Поменять местами содержимое переменных A и B и вывести новые значения A и B.",
			ro: "Interschimbați valorile variabilelor A și B. Afișați noile valori ale lui A și B.",
		},
		stdin: "3 7\n",
		starter: `${HEAD}
int main() {
    double A, B;
    cin >> A >> B;

    // TODO: Begin22 — swap A and B (use a temp variable or swap)
    // <-- your code here

    cout << A << "\\n" << B;
    return 0;
}
`,
	},
	{
		id: "Begin23",
		number: 23,
		text: {
			en: "Variables A, B, C are given. Move A into B, B into C, C into A. Output the new values of A, B, C.",
			ru: "Даны переменные A, B, C. Изменить их значения, переместив содержимое A в B, B — в C, C — в A, и вывести новые значения A, B, C.",
			ro: "Se dau variabilele A, B, C. Mutați valoarea lui A în B, a lui B în C, a lui C în A. Afișați noile valori.",
		},
		stdin: "1 2 3\n",
		starter: `${HEAD}
int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: Begin23 — rotate: newA = C, newB = A, newC = B
    // <-- your code here

    cout << A << "\\n" << B << "\\n" << C;
    return 0;
}
`,
	},
	{
		id: "Begin24",
		number: 24,
		text: {
			en: "Variables A, B, C are given. Move A into C, C into B, B into A. Output the new values of A, B, C.",
			ru: "Даны переменные A, B, C. Изменить их значения, переместив содержимое A в C, C — в B, B — в A, и вывести новые значения A, B, C.",
			ro: "Se dau variabilele A, B, C. Mutați valoarea lui A în C, a lui C în B, a lui B în A. Afișați noile valori.",
		},
		stdin: "1 2 3\n",
		starter: `${HEAD}
int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: Begin24 — rotate: newA = B, newB = C, newC = A
    // <-- your code here

    cout << A << "\\n" << B << "\\n" << C;
    return 0;
}
`,
	},
	{
		id: "Begin25",
		number: 25,
		text: {
			en: "Given x, find y = 3·x⁶ − 6·x² − 7.",
			ru: "Дано значение x. Найти значение функции y = 3·x⁶ − 6·x² − 7.",
			ro: "Se dă x. Aflați valoarea funcției y = 3·x⁶ − 6·x² − 7.",
		},
		stdin: "2\n",
		starter: `${HEAD}
int main() {
    double x;
    cin >> x;

    // TODO: Begin25 — y = 3*x^6 - 6*x^2 - 7 (compute powers step by step)
    double y = 0; // <-- your code here

    cout << y;
    return 0;
}
`,
	},
	{
		id: "Begin26",
		number: 26,
		text: {
			en: "Given x, find y = 4·(x−3)⁶ − 7·(x−3)³ + 2.",
			ru: "Дано значение x. Найти значение функции y = 4·(x−3)⁶ − 7·(x−3)³ + 2.",
			ro: "Se dă x. Aflați valoarea funcției y = 4·(x−3)⁶ − 7·(x−3)³ + 2.",
		},
		stdin: "5\n",
		starter: `${HEAD}
int main() {
    double x;
    cin >> x;

    // TODO: Begin26 — t = x-3, y = 4*t^6 - 7*t^3 + 2
    double y = 0; // <-- your code here

    cout << y;
    return 0;
}
`,
	},
	{
		id: "Begin27",
		number: 27,
		text: {
			en: "Given A, compute A⁸ using three multiplications to get A², A⁴, A⁸ sequentially. Output all powers.",
			ru: "Дано число A. Вычислить A⁸, используя три операции умножения для получения A², A⁴, A⁸. Вывести все полученные степени числа A.",
			ro: "Se dă numărul A. Calculați A⁸ folosind trei înmulțiri pentru A², A⁴, A⁸. Afișați toate puterile.",
		},
		stdin: "2\n",
		starter: `${HEAD}
int main() {
    double A;
    cin >> A;

    // TODO: Begin27 — A2 = A*A, A4 = A2*A2, A8 = A4*A4 (exactly 3 multiplications)
    double A2 = 0, A4 = 0, A8 = 0; // <-- your code here

    cout << A2 << "\\n" << A4 << "\\n" << A8;
    return 0;
}
`,
	},
	{
		id: "Begin28",
		number: 28,
		text: {
			en: "Given A, compute A¹⁵ using five multiplications to get A², A³, A⁵, A¹⁰, A¹⁵ sequentially. Output all powers.",
			ru: "Дано число A. Вычислить A¹⁵, используя пять операций умножения для получения A², A³, A⁵, A¹⁰, A¹⁵. Вывести все полученные степени числа A.",
			ro: "Se dă numărul A. Calculați A¹⁵ folosind cinci înmulțiri pentru A², A³, A⁵, A¹⁰, A¹⁵. Afișați toate puterile.",
		},
		stdin: "2\n",
		starter: `${HEAD}
int main() {
    double A;
    cin >> A;

    // TODO: Begin28 — A2=A*A, A3=A2*A, A5=A3*A2, A10=A5*A5, A15=A10*A5
    double A2 = 0, A3 = 0, A5 = 0, A10 = 0, A15 = 0; // <-- your code here

    cout << A2 << "\\n" << A3 << "\\n" << A5 << "\\n" << A10 << "\\n" << A15;
    return 0;
}
`,
	},
	{
		id: "Begin29",
		number: 29,
		text: {
			en: "Given angle α in degrees (0 ≤ α < 360), convert to radians. 180° = π. Use 3.14 for π.",
			ru: "Дано значение угла α в градусах (0 ≤ α < 360). Определить значение этого же угла в радианах, если 180° = π. В качестве значения π использовать 3.14.",
			ro: "Se dă unghiul α în grade (0 ≤ α < 360). Convertiți-l în radiani. 180° = π, folosiți 3,14 pentru π.",
		},
		stdin: "180\n",
		starter: `${HEAD}
int main() {
    double alpha_deg;
    cin >> alpha_deg;

    // TODO: Begin29 — radians = alpha_deg * pi / 180
    const double pi = 3.14;
    double alpha_rad = 0; // <-- your code here

    cout << alpha_rad;
    return 0;
}
`,
	},
	{
		id: "Begin30",
		number: 30,
		text: {
			en: "Given angle α in radians (0 ≤ α < 2·π), convert to degrees. 180° = π. Use 3.14 for π.",
			ru: "Дано значение угла α в радианах (0 ≤ α < 2·π). Определить значение этого же угла в градусах, если 180° = π. В качестве значения π использовать 3.14.",
			ro: "Se dă unghiul α în radiani (0 ≤ α < 2·π). Convertiți-l în grade. 180° = π, folosiți 3,14 pentru π.",
		},
		stdin: "3.14\n",
		starter: `${HEAD}
int main() {
    double alpha_rad;
    cin >> alpha_rad;

    // TODO: Begin30 — degrees = alpha_rad * 180 / pi
    const double pi = 3.14;
    double alpha_deg = 0; // <-- your code here

    cout << alpha_deg;
    return 0;
}
`,
	},
	{
		id: "Begin31",
		number: 31,
		text: {
			en: "Given Fahrenheit temperature T, convert to Celsius: TC = (TF − 32)·5/9.",
			ru: "Дано значение температуры T в градусах Фаренгейта. Определить значение этой же температуры в градусах Цельсия: TC = (TF − 32)·5/9.",
			ro: "Se dă temperatura T în Fahrenheit. Convertiți-o în Celsius: TC = (TF − 32)·5/9.",
		},
		stdin: "212\n",
		starter: `${HEAD}
int main() {
    double TF;
    cin >> TF;

    // TODO: Begin31 — TC = (TF-32)*5/9
    double TC = 0; // <-- your code here

    cout << TC;
    return 0;
}
`,
	},
	{
		id: "Begin32",
		number: 32,
		text: {
			en: "Given Celsius temperature T, convert to Fahrenheit: TC = (TF − 32)·5/9.",
			ru: "Дано значение температуры T в градусах Цельсия. Определить значение этой же температуры в градусах Фаренгейта: TC = (TF − 32)·5/9.",
			ro: "Se dă temperatura T în Celsius. Convertiți-o în Fahrenheit: TC = (TF − 32)·5/9.",
		},
		stdin: "100\n",
		starter: `${HEAD}
int main() {
    double TC;
    cin >> TC;

    // TODO: Begin32 — TF = TC*9/5 + 32
    double TF = 0; // <-- your code here

    cout << TF;
    return 0;
}
`,
	},
	{
		id: "Begin33",
		number: 33,
		text: {
			en: "X kg of sweets cost A euro. Find the cost of 1 kg and Y kg (positive X, A, Y are given).",
			ru: "Известно, что X кг конфет стоит A рублей. Определить, сколько стоит 1 кг и Y кг этих же конфет.",
			ro: "X kg de dulciuri costă A euro. Aflați costul unui kg și al Y kg (se dau X, A, Y pozitive).",
		},
		stdin: "10 50 3\n",
		starter: `${HEAD}
int main() {
    double X, A, Y;
    cin >> X >> A >> Y;

    // TODO: Begin33 — price1 = A/X, priceY = price1*Y
    double price1 = 0, priceY = 0; // <-- your code here

    cout << price1 << "\\n" << priceY;
    return 0;
}
`,
	},
	{
		id: "Begin34",
		number: 34,
		text: {
			en: "X kg of chocolate cost A euro and Y kg of sugar candies cost B euro. Find the cost of 1 kg of each and how many times chocolate is more expensive.",
			ru: "Известно, что X кг шоколадных конфет стоит A рублей, а Y кг ирисок стоит B рублей. Определить, сколько стоит 1 кг каждого вида и во сколько раз шоколадные конфеты дороже ирисок.",
			ro: "X kg de ciocolată costă A euro, iar Y kg de caramele costă B euro. Aflați costul unui kg din fiecare și de câte ori ciocolata e mai scumpă.",
		},
		stdin: "2 60 3 30\n",
		starter: `${HEAD}
int main() {
    double X, A, Y, B;
    cin >> X >> A >> Y >> B;

    // TODO: Begin34 — choc = A/X, sugar = B/Y, ratio = choc/sugar
    double choc = 0, sugar = 0, ratio = 0; // <-- your code here

    cout << choc << "\\n" << sugar << "\\n" << ratio;
    return 0;
}
`,
	},
	{
		id: "Begin35",
		number: 35,
		text: {
			en: "Boat speed in still water V km/h, river flow U km/h (U < V). The boat goes on the lake T1 h, then against the stream T2 h. Find distance S (given V, U, T1, T2).",
			ru: "Скорость лодки в стоячей воде V км/ч, скорость течения реки U км/ч (U < V). Лодка идет по озеру T1 ч, а затем против течения реки T2 ч. Найти путь S, пройденный лодкой.",
			ro: "Viteza bărcii în apă stătătoare V km/h, viteza curentului U km/h (U < V). Barca merge pe lac T1 h, apoi contra curentului T2 h. Aflați distanța S.",
		},
		stdin: "10 2 3 2\n",
		starter: `${HEAD}
int main() {
    double V, U, T1, T2;
    cin >> V >> U >> T1 >> T2;

    // TODO: Begin35 — S = V*T1 + (V-U)*T2
    double S = 0; // <-- your code here

    cout << S;
    return 0;
}
`,
	},
	{
		id: "Begin36",
		number: 36,
		text: {
			en: "Speeds V1, V2 km/h, initial distance S km. Find the distance after T hours if the distance is increasing: S + (V1+V2)·T.",
			ru: "Скорость первого автомобиля V1 км/ч, второго — V2 км/ч, расстояние между ними S км. Определить расстояние между ними через T часов, если автомобили удаляются друг от друга.",
			ro: "Vitezele V1, V2 km/h, distanța inițială S km. Aflați distanța după T ore dacă distanța crește: S + (V1+V2)·T.",
		},
		stdin: "60 40 10 2\n",
		starter: `${HEAD}
int main() {
    double V1, V2, S, T;
    cin >> V1 >> V2 >> S >> T;

    // TODO: Begin36 — D = S + (V1+V2)*T
    double D = 0; // <-- your code here

    cout << D;
    return 0;
}
`,
	},
	{
		id: "Begin37",
		number: 37,
		text: {
			en: "Speeds V1, V2, initial distance S. Find the distance after T hours if it was initially decreasing: |S − (V1+V2)·T|.",
			ru: "Скорость первого автомобиля V1 км/ч, второго — V2 км/ч, расстояние между ними S км. Определить расстояние между ними через T часов, если первоначально автомобили приближаются друг к другу.",
			ro: "Vitezele V1, V2, distanța inițială S. Aflați distanța după T ore dacă inițial scade: |S − (V1+V2)·T|.",
		},
		stdin: "60 40 300 2\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double V1, V2, S, T;
    cin >> V1 >> V2 >> S >> T;

    // TODO: Begin37 — D = abs(S - (V1+V2)*T)
    double D = 0; // <-- your code here, use abs

    cout << D;
    return 0;
}
`,
	},
	{
		id: "Begin38",
		number: 38,
		text: {
			en: "Solve the linear equation A·x + B = 0 with given A and B (A ≠ 0).",
			ru: "Решить линейное уравнение A·x + B = 0 с заданными коэффициентами A и B (A ≠ 0).",
			ro: "Rezolvați ecuația liniară A·x + B = 0 cu coeficienții A și B dați (A ≠ 0).",
		},
		stdin: "3 6\n",
		starter: `${HEAD}
int main() {
    double A, B;
    cin >> A >> B;

    // TODO: Begin38 — x = -B/A
    double x = 0; // <-- your code here

    cout << x;
    return 0;
}
`,
	},
	{
		id: "Begin39",
		number: 39,
		text: {
			en: "Solve the quadratic A·x² + B·x + C = 0 (A and discriminant > 0). Output the smaller root, then the larger: x = (−B ± √D)/(2·A), D = B²−4·A·C.",
			ru: "Найти корни квадратного уравнения A·x² + B·x + C = 0 с заданными коэффициентами A, B, C (A и дискриминант положительны). Вывести сначала меньший, затем больший корень: x = (−B ± √D)/(2·A), D = B²−4·A·C.",
			ro: "Rezolvați ecuația A·x² + B·x + C = 0 (A și discriminantul > 0). Afișați rădăcina mică, apoi cea mare: x = (−B ± √D)/(2·A), D = B²−4·A·C.",
		},
		stdin: "1 -5 6\n",
		starter: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: Begin39 — D = B*B-4*A*C, x1 = (-B-sqrt(D))/(2*A), x2 = (-B+sqrt(D))/(2*A)
    double x1 = 0, x2 = 0; // <-- your code here

    cout << x1 << "\\n" << x2;
    return 0;
}
`,
	},
	{
		id: "Begin40",
		number: 40,
		text: {
			en: "Solve the system A1·x+B1·y=C1, A2·x+B2·y=C2 (unique solution): x=(C1·B2−C2·B1)/D, y=(A1·C2−A2·C1)/D, D=A1·B2−A2·B1.",
			ru: "Решить систему линейных уравнений A1·x+B1·y=C1, A2·x+B2·y=C2, если известно, что она имеет единственное решение: x=(C1·B2−C2·B1)/D, y=(A1·C2−A2·C1)/D, где D=A1·B2−A2·B1.",
			ro: "Rezolvați sistemul A1·x+B1·y=C1, A2·x+B2·y=C2 (soluție unică): x=(C1·B2−C2·B1)/D, y=(A1·C2−A2·C1)/D, D=A1·B2−A2·B1.",
		},
		stdin: "1 1 5 2 -1 4\n",
		starter: `${HEAD}
int main() {
    double A1, B1, C1, A2, B2, C2;
    cin >> A1 >> B1 >> C1 >> A2 >> B2 >> C2;

    // TODO: Begin40 — D = A1*B2-A2*B1, x = (C1*B2-C2*B1)/D, y = (A1*C2-A2*C1)/D
    double x = 0, y = 0; // <-- your code here

    cout << x << "\\n" << y;
    return 0;
}
`,
	},
];
