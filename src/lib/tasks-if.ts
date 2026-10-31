import type { BeginTask } from "./tasks-begin";

const HEAD = `#include <iostream>
using namespace std;
`;

const HEAD_CMATH = `#include <iostream>
#include <cmath>
using namespace std;
`;

const HEAD_STRING = `#include <iostream>
#include <string>
using namespace std;
`;

export const IF_TASKS: BeginTask[] = [
	{
		id: "If1",
		number: 1,
		text: {
			en: "An integer is given. If the integer is positive then decrease it by 8, otherwise do not change it. Output the obtained integer.",
			ru: "Дано целое число. Если оно является положительным, то уменьшить его на 8; в противном случае не изменять его. Вывести полученное число.",
			ro: "Se dă un număr întreg. Dacă acesta este pozitiv, micșorați-l cu 8, altfel nu-l schimbați. Afișați numărul obținut.",
		},
		stdin: "5\n",
		starter: `${HEAD}
int main() {
    int a;
    cin >> a;

    // TODO: write your solution here
    int result = 0; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "If2",
		number: 2,
		text: {
			en: "An integer is given. If the integer is positive then decrease it by 8, otherwise increase it by 6. Output the obtained integer.",
			ru: "Дано целое число. Если оно является положительным, то уменьшить его на 8; в противном случае увеличить его на 6. Вывести полученное число.",
			ro: "Se dă un număr întreg. Dacă acesta este pozitiv, micșorați-l cu 8, altfel măriți-l cu 6. Afișați numărul obținut.",
		},
		stdin: "5\n",
		starter: `${HEAD}
int main() {
    int a;
    cin >> a;

    // TODO: write your solution here
    int result = 0; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "If3",
		number: 3,
		text: {
			en: "An integer is given. If the integer is positive then decrease it by 8, if the integer is negative then increase it by 6, if the integer equals 0 then change it to 10. Output the obtained integer.",
			ru: "Дано целое число. Если оно является положительным, то уменьшить его на 8; если оно является отрицательным, то увеличить его на 6; если оно равно 0, то заменить его на 10. Вывести полученное число.",
			ro: "Se dă un număr întreg. Dacă acesta este pozitiv, micșorați-l cu 8; dacă este negativ, măriți-l cu 6; dacă este 0, schimbați-l cu 10. Afișați numărul obținut.",
		},
		stdin: "5\n",
		starter: `${HEAD}
int main() {
    int a;
    cin >> a;

    // TODO: write your solution here
    int result = 0; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "If4",
		number: 4,
		text: {
			en: "Three integers are given. Find the amount of positive integers in the input data.",
			ru: "Даны три целых числа. Найти количество положительных чисел в исходном наборе.",
			ro: "Se dau trei numere întregi. Aflați câte numere pozitive se află în setul dat.",
		},
		stdin: "1 -2 3\n",
		starter: `${HEAD}
int main() {
    int a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    int count = 0; // <-- your code here

    cout << count;
    return 0;
}
`,
	},
	{
		id: "If5",
		number: 5,
		text: {
			en: "Three integers are given. Find the amount of positive and amount of negative integers in the input data.",
			ru: "Даны три целых числа. Найти количество положительных и количество отрицательных чисел в исходном наборе.",
			ro: "Se dau trei numere întregi. Aflați câte numere pozitive și câte numere negative se află în setul dat.",
		},
		stdin: "1 -2 0\n",
		starter: `${HEAD}
int main() {
    int a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    int pos = 0, neg = 0; // <-- your code here

    cout << pos << " " << neg;
    return 0;
}
`,
	},
	{
		id: "If6",
		number: 6,
		text: {
			en: "Given two real numbers, output the larger value of them.",
			ru: "Даны два числа. Вывести большее из них.",
			ro: "Se dau două numere reale. Afișați valoarea mai mare dintre ele.",
		},
		stdin: "3.5 7.2\n",
		starter: `${HEAD}
int main() {
    double a, b;
    cin >> a >> b;

    // TODO: write your solution here
    double m = 0; // <-- your code here

    cout << m;
    return 0;
}
`,
	},
	{
		id: "If7",
		number: 7,
		text: {
			en: "Given two real numbers, output the order number of the smaller of them.",
			ru: "Даны два числа. Вывести порядковый номер меньшего из них.",
			ro: "Se dau două numere reale. Afișați numărul de ordine al celui mai mic dintre ele.",
		},
		stdin: "3.5 7.2\n",
		starter: `${HEAD}
int main() {
    double a, b;
    cin >> a >> b;

    // TODO: write your solution here
    int idx = 0; // <-- your code here

    cout << idx;
    return 0;
}
`,
	},
	{
		id: "If8",
		number: 8,
		text: {
			en: "Given two real numbers, output the larger value and then the smaller value of them.",
			ru: "Даны два числа. Вывести сначала большее, а затем меньшее из них.",
			ro: "Se dau două numere reale. Afișați mai întâi valoarea mai mare, apoi valoarea mai mică dintre ele.",
		},
		stdin: "3.5 7.2\n",
		starter: `${HEAD}
int main() {
    double a, b;
    cin >> a >> b;

    // TODO: write your solution here
    double first = 0, second = 0; // <-- your code here

    cout << first << " " << second;
    return 0;
}
`,
	},
	{
		id: "If9",
		number: 9,
		text: {
			en: "The values of two real variables A and B are given. Redistribute the values so that A and B have the smaller and the larger value respectively. Output the new values of the variables A and B.",
			ru: "Даны две переменные вещественного типа: A, B. Перераспределить значения данных переменных так, чтобы в A оказалось меньшее из значений, а в B — большее. Вывести новые значения переменных A и B.",
			ro: "Se dau două variabile reale A și B. Redistribuiți valorile astfel încât A să conțină valoarea mai mică, iar B — valoarea mai mare. Afișați noile valori ale variabilelor A și B.",
		},
		stdin: "7 3\n",
		starter: `${HEAD}
int main() {
    double A, B;
    cin >> A >> B;

    // TODO: write your solution here
    // <-- your code here

    cout << A << " " << B;
    return 0;
}
`,
	},
	{
		id: "If10",
		number: 10,
		text: {
			en: "The values of two integer variables A and B are given. If the values are not equal then assign the sum of given values to each variable, otherwise assign zero value to each variable. Output the new values of the variables A and B.",
			ru: "Даны две переменные целого типа: A и B. Если их значения не равны, то присвоить каждой переменной сумму этих значений, а если равны, то присвоить переменным нулевые значения. Вывести новые значения переменных A и B.",
			ro: "Se dau două variabile întregi A și B. Dacă valorile nu sunt egale, atribuiți fiecărei variabile suma valorilor date, altfel atribuiți variabilelor valoarea zero. Afișați noile valori ale variabilelor A și B.",
		},
		stdin: "3 7\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    // <-- your code here

    cout << A << " " << B;
    return 0;
}
`,
	},
	{
		id: "If11",
		number: 11,
		text: {
			en: "The values of two integer variables A and B are given. If the values are not equal then assign the larger value to each variable, otherwise assign zero value to each variable. Output the new values of the variables A and B.",
			ru: "Даны две переменные целого типа: A и B. Если их значения не равны, то присвоить каждой переменной большее из этих значений, а если равны, то присвоить переменным нулевые значения. Вывести новые значения переменных A и B.",
			ro: "Se dau două variabile întregi A și B. Dacă valorile nu sunt egale, atribuiți fiecărei variabile valoarea mai mare dintre ele, altfel atribuiți variabilelor valoarea zero. Afișați noile valori ale variabilelor A și B.",
		},
		stdin: "3 7\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    // <-- your code here

    cout << A << " " << B;
    return 0;
}
`,
	},
	{
		id: "If12",
		number: 12,
		text: {
			en: "Given three real numbers, output the minimal value of them.",
			ru: "Даны три числа. Найти минимальное из них.",
			ro: "Se dau trei numere reale. Afișați valoarea minimă dintre ele.",
		},
		stdin: "3 1 2\n",
		starter: `${HEAD}
int main() {
    double a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    double m = 0; // <-- your code here

    cout << m;
    return 0;
}
`,
	},
	{
		id: "If13",
		number: 13,
		text: {
			en: "Given three real numbers, output the value between the minimum and the maximum.",
			ru: "Даны три числа. Найти среднее из них (то есть число, расположенное между наименьшим и наибольшим).",
			ro: "Se dau trei numere reale. Afișați valoarea dintre minim și maxim.",
		},
		stdin: "3 1 2\n",
		starter: `${HEAD}
int main() {
    double a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    double mid = 0; // <-- your code here

    cout << mid;
    return 0;
}
`,
	},
	{
		id: "If14",
		number: 14,
		text: {
			en: "Given three real numbers, output the minimal value and then the maximal value.",
			ru: "Даны три числа. Вывести сначала наименьшее, а затем наибольшее из них.",
			ro: "Se dau trei numere reale. Afișați mai întâi valoarea minimă, apoi valoarea maximă dintre ele.",
		},
		stdin: "3 1 2\n",
		starter: `${HEAD}
int main() {
    double a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    double mn = 0, mx = 0; // <-- your code here

    cout << mn << " " << mx;
    return 0;
}
`,
	},
	{
		id: "If15",
		number: 15,
		text: {
			en: "Given three real numbers, output the sum of two largest values.",
			ru: "Даны три числа. Найти сумму двух наибольших из них.",
			ro: "Se dau trei numere reale. Afișați suma celor mai mari două valori dintre ele.",
		},
		stdin: "3 1 2\n",
		starter: `${HEAD}
int main() {
    double a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    double sum = 0; // <-- your code here

    cout << sum;
    return 0;
}
`,
	},
	{
		id: "If16",
		number: 16,
		text: {
			en: "The values of three real variables A, B, C are given. If the values are in ascending order then double them, otherwise replace the value of each variable by its opposite value. Output the new values of the variables A, B, C.",
			ru: "Даны три переменные вещественного типа: A, B, C. Если их значения упорядочены по возрастанию, то удвоить их; в противном случае заменить значение каждой переменной на противоположное. Вывести новые значения переменных A, B, C.",
			ro: "Se dau trei variabile reale A, B, C. Dacă valorile sunt în ordine crescătoare, dublați-le, altfel înlocuiți valoarea fiecărei variabile cu opusul ei. Afișați noile valori ale variabilelor A, B, C.",
		},
		stdin: "1 2 3\n",
		starter: `${HEAD}
int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    // <-- your code here

    cout << A << " " << B << " " << C;
    return 0;
}
`,
	},
	{
		id: "If17",
		number: 17,
		text: {
			en: "The values of three real variables A, B, C are given. If the values are in ascending or descending order then double them, otherwise replace the value of each variable by its opposite value. Output the new values of the variables A, B, C.",
			ru: "Даны три переменные вещественного типа: A, B, C. Если их значения упорядочены по возрастанию или убыванию, то удвоить их; в противном случае заменить значение каждой переменной на противоположное. Вывести новые значения переменных A, B, C.",
			ro: "Se dau trei variabile reale A, B, C. Dacă valorile sunt în ordine crescătoare sau descrescătoare, dublați-le, altfel înlocuiți valoarea fiecărei variabile cu opusul ei. Afișați noile valori ale variabilelor A, B, C.",
		},
		stdin: "1 2 3\n",
		starter: `${HEAD}
int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    // <-- your code here

    cout << A << " " << B << " " << C;
    return 0;
}
`,
	},
	{
		id: "If18",
		number: 18,
		text: {
			en: "Three integers are given. One of them differs from two other equal integers. Output the order number of the integer that differs from the others.",
			ru: "Даны три целых числа, одно из которых отлично от двух других, равных между собой. Определить порядковый номер числа, отличного от остальных.",
			ro: "Se dau trei numere întregi. Unul dintre ele diferă de celelalte două, egale între ele. Afișați numărul de ordine al întregului care diferă de celelalte.",
		},
		stdin: "1 1 2\n",
		starter: `${HEAD}
int main() {
    int a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    int idx = 0; // <-- your code here

    cout << idx;
    return 0;
}
`,
	},
	{
		id: "If19",
		number: 19,
		text: {
			en: "Four integers are given. One of them differs from three other equal integers. Output the order number of the integer that differs from the others.",
			ru: "Даны четыре целых числа, одно из которых отлично от трех других, равных между собой. Определить порядковый номер числа, отличного от остальных.",
			ro: "Se dau patru numere întregi. Unul dintre ele diferă de celelalte trei, egale între ele. Afișați numărul de ordine al întregului care diferă de celelalte.",
		},
		stdin: "1 1 1 2\n",
		starter: `${HEAD}
int main() {
    int a, b, c, d;
    cin >> a >> b >> c >> d;

    // TODO: write your solution here
    int idx = 0; // <-- your code here

    cout << idx;
    return 0;
}
`,
	},
	{
		id: "If20",
		number: 20,
		text: {
			en: "Three points A, B, C on the real axis are given. Determine whether B or C is closer to A. Output the nearest point and its distance from A.",
			ru: "На числовой оси расположены три точки: A, B, C. Определить, какая из двух последних точек (B или C) расположена ближе к A, и вывести эту точку и ее расстояние от точки A.",
			ro: "Se dau trei puncte A, B, C pe axa reală. Stabiliți dacă B sau C este mai aproape de A. Afișați punctul cel mai apropiat și distanța lui față de A.",
		},
		stdin: "0 3 7\n",
		starter: `${HEAD}
int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    double point = 0, dist = 0; // <-- your code here

    cout << point << " " << dist;
    return 0;
}
`,
	},
	{
		id: "If21",
		number: 21,
		text: {
			en: "Integer coordinates of a point in the coordinate plane are given. If the point coincides with the origin of coordinates then output 0, otherwise if the point lies on the x-axis or y-axis then output 1 or 2 respectively. If the point does not lie on the coordinate axes then output 3.",
			ru: "Даны целочисленные координаты точки на плоскости. Если точка совпадает с началом координат, то вывести 0. Если точка не совпадает с началом координат, но лежит на оси OX или OY, то вывести соответственно 1 или 2. Если точка не лежит на координатных осях, то вывести 3.",
			ro: "Se dau coordonatele întregi ale unui punct în plan. Dacă punctul coincide cu originea, afișați 0, altfel dacă punctul se află pe axa Ox sau Oy, afișați 1 sau 2. Dacă punctul nu se află pe axele de coordonate, afișați 3.",
		},
		stdin: "3 4\n",
		starter: `${HEAD}
int main() {
    int x, y;
    cin >> x >> y;

    // TODO: write your solution here
    int result = 0; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "If22",
		number: 22,
		text: {
			en: "Given coordinates of a point that does not lie on the coordinate axes, find the number of a coordinate quarter containing the point.",
			ru: "Даны координаты точки, не лежащей на координатных осях OX и OY. Определить номер координатной четверти, в которой находится данная точка.",
			ro: "Se dau coordonatele unui punct care nu se află pe axele de coordonate. Aflați numărul cadranului în care se află punctul.",
		},
		stdin: "3 4\n",
		starter: `${HEAD}
int main() {
    double x, y;
    cin >> x >> y;

    // TODO: write your solution here
    int q = 0; // <-- your code here

    cout << q;
    return 0;
}
`,
	},
	{
		id: "If23",
		number: 23,
		text: {
			en: "Given integer coordinates of three vertices of a rectangle whose sides are parallel to coordinate axes, find the coordinates of the fourth vertex of the rectangle.",
			ru: "Даны целочисленные координаты трех вершин прямоугольника, стороны которого параллельны координатным осям. Найти координаты его четвертой вершины.",
			ro: "Se dau coordonatele întregi ale trei vârfuri ale unui dreptunghi cu laturile paralele cu axele de coordonate. Aflați coordonatele celui de-al patrulea vârf al dreptunghiului.",
		},
		stdin: "1 1 1 3 4 1\n",
		starter: `${HEAD}
int main() {
    int x1, y1, x2, y2, x3, y3;
    cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;

    // TODO: write your solution here
    int x4 = 0, y4 = 0; // <-- your code here

    cout << x4 << " " << y4;
    return 0;
}
`,
	},
	{
		id: "If24",
		number: 24,
		text: {
			en: "Given a real x, find the value of a real function f defined as: f(x) = 2·sin(x) if x > 0, 6 − x if x ≤ 0.",
			ru: "Для данного вещественного x найти значение вещественной функции f, заданной следующим образом: f(x) = 2·sin(x), если x > 0, 6 − x, если x ≤ 0.",
			ro: "Se dă un număr real x. Aflați valoarea funcției reale f definită astfel: f(x) = 2·sin(x) dacă x > 0, 6 − x dacă x ≤ 0.",
		},
		stdin: "1\n",
		starter: `${HEAD_CMATH}
int main() {
    double x;
    cin >> x;

    // TODO: write your solution here
    double f = 0; // <-- your code here, use sin

    cout << f;
    return 0;
}
`,
	},
	{
		id: "If25",
		number: 25,
		text: {
			en: "Given an integer x, find the value of an integer function f defined as: f(x) = 2·x if x < −2 or x > 2, −3·x otherwise.",
			ru: "Для данного целого x найти значение целочисленной функции f, заданной следующим образом: f(x) = 2·x, если x < −2 или x > 2, −3·x в противном случае.",
			ro: "Se dă un număr întreg x. Aflați valoarea funcției întregi f definită astfel: f(x) = 2·x dacă x < −2 sau x > 2, −3·x în rest.",
		},
		stdin: "5\n",
		starter: `${HEAD}
int main() {
    int x;
    cin >> x;

    // TODO: write your solution here
    int f = 0; // <-- your code here

    cout << f;
    return 0;
}
`,
	},
	{
		id: "If26",
		number: 26,
		text: {
			en: "Given a real x, find the value of a real function f defined as: −x if x ≤ 0, x² if 0 < x < 2, 4 if x ≥ 2.",
			ru: "Для данного вещественного x найти значение вещественной функции f, заданной следующим образом: −x, если x ≤ 0, x², если 0 < x < 2, 4, если x ≥ 2.",
			ro: "Se dă un număr real x. Aflați valoarea funcției reale f definită astfel: −x dacă x ≤ 0, x² dacă 0 < x < 2, 4 dacă x ≥ 2.",
		},
		stdin: "1\n",
		starter: `${HEAD}
int main() {
    double x;
    cin >> x;

    // TODO: write your solution here
    double f = 0; // <-- your code here

    cout << f;
    return 0;
}
`,
	},
	{
		id: "If27",
		number: 27,
		text: {
			en: "Given a real x, find the value of an integer function f defined as: 0 if x < 0, 1 if x belongs to [0, 1), [2, 3), …, −1 if x belongs to [1, 2), [3, 4), ….",
			ru: "Для данного вещественного x найти значение целочисленной функции f, заданной следующим образом: 0, если x < 0, 1, если x принадлежит [0, 1), [2, 3), …, −1, если x принадлежит [1, 2), [3, 4), ….",
			ro: "Se dă un număr real x. Aflați valoarea funcției întregi f definită astfel: 0 dacă x < 0, 1 dacă x aparține [0, 1), [2, 3), …, −1 dacă x aparține [1, 2), [3, 4), ….",
		},
		stdin: "2.5\n",
		starter: `${HEAD_CMATH}
int main() {
    double x;
    cin >> x;

    // TODO: write your solution here
    int f = 0; // <-- your code here, use floor

    cout << f;
    return 0;
}
`,
	},
	{
		id: "If28",
		number: 28,
		text: {
			en: "Given a number of year (as a positive integer), find the amount of days in the year (365 for an ordinary year, 366 for a leap year). A leap year is every year divisible by 4, except centenary years not divisible by 400 (e.g. 1900 is ordinary, 2000 is leap).",
			ru: "Дан номер некоторого года (положительное целое число). Определить количество дней в этом году, учитывая, что обычный год насчитывает 365 дней, а високосный — 366 дней. Високосным считается год, делящийся на 4, за исключением тех годов, которые делятся на 100 и не делятся на 400 (например, год 1900 не является високосным, а 2000 — является).",
			ro: "Se dă un an (număr întreg pozitiv). Aflați numărul de zile din acel an (365 pentru un an obișnuit, 366 pentru un an bisect). Un an bisect este orice an divizibil cu 4, cu excepția anilor seculari nedivizibili cu 400 (de exemplu, 1900 este obișnuit, 2000 este bisect).",
		},
		stdin: "2024\n",
		starter: `${HEAD}
int main() {
    int year;
    cin >> year;

    // TODO: write your solution here
    int days = 0; // <-- your code here

    cout << days;
    return 0;
}
`,
	},
	{
		id: "If29",
		number: 29,
		text: {
			en: 'Given an integer, output its description string as: "negative even number", "zero number", "positive odd number", etc.',
			ru: "Дано целое число. Вывести строку-описание вида «отрицательное четное число», «нулевое число», «положительное нечетное число» и т. д.",
			ro: "Se dă un număr întreg. Afișați descrierea lui sub formă de șir, de exemplu „negative even number”, „zero number”, „positive odd number”.",
		},
		stdin: "5\n",
		starter: `${HEAD_STRING}
int main() {
    int a;
    cin >> a;

    // TODO: write your solution here
    string desc = ""; // <-- your code here

    cout << desc;
    return 0;
}
`,
	},
	{
		id: "If30",
		number: 30,
		text: {
			en: 'An integer in the range 1 to 999 is given. Output its description string as: "two-digit even number", "three-digit odd number", etc.',
			ru: "Дано целое число, лежащее в диапазоне 1–999. Вывести его строку-описание вида «четное двузначное число», «нечетное трехзначное число» и т. д.",
			ro: "Se dă un număr întreg între 1 și 999. Afișați descrierea lui sub formă de șir, de exemplu „two-digit even number”, „three-digit odd number”.",
		},
		stdin: "42\n",
		starter: `${HEAD_STRING}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    string desc = ""; // <-- your code here

    cout << desc;
    return 0;
}
`,
	},
];
