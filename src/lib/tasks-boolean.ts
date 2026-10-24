import type { BeginTask } from "./tasks-begin";

const HEAD = `#include <iostream>
using namespace std;
`;

const HEAD_CMATH = `#include <iostream>
#include <cmath>
using namespace std;
`;

export const BOOLEAN_TASKS: BeginTask[] = [
	{
		id: "Boolean1",
		number: 1,
		text: {
			en: 'Given integer A, verify the following proposition: "The number A is positive".',
			ru: "Дано целое число A. Проверить истинность высказывания: «Число A является положительным».",
			ro: "Se dă numărul întreg A. Verificați propoziția: „Numărul A este pozitiv”.",
		},
		stdin: "5\n",
		starter: `${HEAD}
int main() {
    int A;
    cin >> A;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean2",
		number: 2,
		text: {
			en: 'Given integer A, verify the following proposition: "The number A is odd".',
			ru: "Дано целое число A. Проверить истинность высказывания: «Число A является нечетным».",
			ro: "Se dă numărul întreg A. Verificați propoziția: „Numărul A este impar”.",
		},
		stdin: "5\n",
		starter: `${HEAD}
int main() {
    int A;
    cin >> A;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean3",
		number: 3,
		text: {
			en: 'Given integer A, verify the following proposition: "The number A is even".',
			ru: "Дано целое число A. Проверить истинность высказывания: «Число A является четным».",
			ro: "Se dă numărul întreg A. Verificați propoziția: „Numărul A este par”.",
		},
		stdin: "4\n",
		starter: `${HEAD}
int main() {
    int A;
    cin >> A;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean4",
		number: 4,
		text: {
			en: 'Given two integers A and B, verify the following proposition: "The inequalities A > 2 and B ≤ 3 both are fulfilled".',
			ru: "Даны два целых числа: A, B. Проверить истинность высказывания: «Справедливы неравенства A > 2 и B ≤ 3».",
			ro: "Se dau două numere întregi A și B. Verificați propoziția: „Inegalitățile A > 2 și B ≤ 3 sunt ambele îndeplinite”.",
		},
		stdin: "3 2\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean5",
		number: 5,
		text: {
			en: 'Given two integers A and B, verify the following proposition: "The inequality A ≥ 0 is fulfilled or the inequality B < −2 is fulfilled".',
			ru: "Даны два целых числа: A, B. Проверить истинность высказывания: «Справедливо неравенство A ≥ 0 или справедливо неравенство B < −2».",
			ro: "Se dau două numere întregi A și B. Verificați propoziția: „Inegalitatea A ≥ 0 este îndeplinită sau inegalitatea B < −2 este îndeplinită”.",
		},
		stdin: "1 -3\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean6",
		number: 6,
		text: {
			en: 'Given three integers A, B, C, verify the following proposition: "The double inequality A < B < C is fulfilled".',
			ru: "Даны три целых числа: A, B, C. Проверить истинность высказывания: «Справедливо двойное неравенство A < B < C».",
			ro: "Se dau trei numere întregi A, B, C. Verificați propoziția: „Inegalitatea dublă A < B < C este îndeplinită”.",
		},
		stdin: "1 2 3\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean7",
		number: 7,
		text: {
			en: 'Given three integers A, B, C, verify the following proposition: "The number B is between A and C".',
			ru: "Даны три целых числа: A, B, C. Проверить истинность высказывания: «Число B находится между числами A и C».",
			ro: "Se dau trei numere întregi A, B, C. Verificați propoziția: „Numărul B se află între A și C”.",
		},
		stdin: "1 3 5\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean8",
		number: 8,
		text: {
			en: 'Given two integers A and B, verify the following proposition: "Each of the numbers A and B is odd".',
			ru: "Даны два целых числа: A, B. Проверить истинность высказывания: «Каждое из чисел A и B нечетное».",
			ro: "Se dau două numere întregi A și B. Verificați propoziția: „Fiecare dintre numerele A și B este impar”.",
		},
		stdin: "3 5\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean9",
		number: 9,
		text: {
			en: 'Given two integers A and B, verify the following proposition: "At least one of the numbers A and B is odd".',
			ru: "Даны два целых числа: A, B. Проверить истинность высказывания: «Хотя бы одно из чисел A и B нечетное».",
			ro: "Se dau două numere întregi A și B. Verificați propoziția: „Cel puțin unul dintre numerele A și B este impar”.",
		},
		stdin: "2 3\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean10",
		number: 10,
		text: {
			en: 'Given two integers A and B, verify the following proposition: "Exactly one of the numbers A and B is odd".',
			ru: "Даны два целых числа: A, B. Проверить истинность высказывания: «Ровно одно из чисел A и B нечетное».",
			ro: "Se dau două numere întregi A și B. Verificați propoziția: „Exact unul dintre numerele A și B este impar”.",
		},
		stdin: "2 3\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean11",
		number: 11,
		text: {
			en: 'Given two integers A and B, verify the following proposition: "The numbers A and B have equal parity".',
			ru: "Даны два целых числа: A, B. Проверить истинность высказывания: «Числа A и B имеют одинаковую четность».",
			ro: "Se dau două numere întregi A și B. Verificați propoziția: „Numerele A și B au aceeași paritate”.",
		},
		stdin: "2 4\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean12",
		number: 12,
		text: {
			en: 'Given three integers A, B, C, verify the following proposition: "Each of the numbers A, B, C is positive".',
			ru: "Даны три целых числа: A, B, C. Проверить истинность высказывания: «Каждое из чисел A, B, C положительное».",
			ro: "Se dau trei numere întregi A, B, C. Verificați propoziția: „Fiecare dintre numerele A, B, C este pozitiv”.",
		},
		stdin: "1 2 3\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean13",
		number: 13,
		text: {
			en: 'Given three integers A, B, C, verify the following proposition: "At least one of the numbers A, B, C is positive".',
			ru: "Даны три целых числа: A, B, C. Проверить истинность высказывания: «Хотя бы одно из чисел A, B, C положительное».",
			ro: "Se dau trei numere întregi A, B, C. Verificați propoziția: „Cel puțin unul dintre numerele A, B, C este pozitiv”.",
		},
		stdin: "-1 0 5\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean14",
		number: 14,
		text: {
			en: 'Given three integers A, B, C, verify the following proposition: "Exactly one of the numbers A, B, C is positive".',
			ru: "Даны три целых числа: A, B, C. Проверить истинность высказывания: «Ровно одно из чисел A, B, C положительное».",
			ro: "Se dau trei numere întregi A, B, C. Verificați propoziția: „Exact unul dintre numerele A, B, C este pozitiv”.",
		},
		stdin: "-1 0 5\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean15",
		number: 15,
		text: {
			en: 'Given three integers A, B, C, verify the following proposition: "Exactly two of the numbers A, B, C are positive".',
			ru: "Даны три целых числа: A, B, C. Проверить истинность высказывания: «Ровно два из чисел A, B, C являются положительными».",
			ro: "Se dau trei numere întregi A, B, C. Verificați propoziția: „Exact două dintre numerele A, B, C sunt pozitive”.",
		},
		stdin: "1 2 -3\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean16",
		number: 16,
		text: {
			en: 'Given a positive integer, verify the following proposition: "The integer is a two-digit even number".',
			ru: "Дано положительное целое число. Проверить истинность высказывания: «Данное число является четным двузначным».",
			ro: "Se dă un număr întreg pozitiv. Verificați propoziția: „Numărul este par de două cifre”.",
		},
		stdin: "42\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean17",
		number: 17,
		text: {
			en: 'Given a positive integer, verify the following proposition: "The integer is a three-digit odd number".',
			ru: "Дано положительное целое число. Проверить истинность высказывания: «Данное число является нечетным трехзначным».",
			ro: "Se dă un număr întreg pozitiv. Verificați propoziția: „Numărul este impar de trei cifre”.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean18",
		number: 18,
		text: {
			en: 'Verify the following proposition: "Among three given integers there is at least one pair of equal ones".',
			ru: "Проверить истинность высказывания: «Среди трех данных целых чисел есть хотя бы одна пара совпадающих».",
			ro: "Verificați propoziția: „Între cele trei numere întregi date există cel puțin o pereche de egale”.",
		},
		stdin: "1 2 1\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean19",
		number: 19,
		text: {
			en: 'Verify the following proposition: "Among three given integers there is at least one pair of opposite ones".',
			ru: "Проверить истинность высказывания: «Среди трех данных целых чисел есть хотя бы одна пара взаимно противоположных».",
			ro: "Verificați propoziția: „Între cele trei numere întregi date există cel puțin o pereche de opuse”.",
		},
		stdin: "1 -1 2\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean20",
		number: 20,
		text: {
			en: 'Given a three-digit integer, verify the following proposition: "All digits of the number are different".',
			ru: "Дано трехзначное число. Проверить истинность высказывания: «Все цифры данного числа различны».",
			ro: "Se dă un număr de trei cifre. Verificați propoziția: „Toate cifrele numărului sunt diferite”.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean21",
		number: 21,
		text: {
			en: 'Given a three-digit integer, verify the following proposition: "All digits of the number are in ascending order".',
			ru: "Дано трехзначное число. Проверить истинность высказывания: «Цифры данного числа образуют возрастающую последовательность».",
			ro: "Se dă un număr de trei cifre. Verificați propoziția: „Cifrele numărului sunt în ordine crescătoare”.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean22",
		number: 22,
		text: {
			en: 'Given a three-digit integer, verify the following proposition: "All digits of the number are in ascending or descending order".',
			ru: "Дано трехзначное число. Проверить истинность высказывания: «Цифры данного числа образуют возрастающую или убывающую последовательность».",
			ro: "Se dă un număr de trei cifre. Verificați propoziția: „Cifrele numărului sunt în ordine crescătoare sau descrescătoare”.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean23",
		number: 23,
		text: {
			en: 'Given a four-digit integer, verify the following proposition: "The number is read equally both from left to right and from right to left".',
			ru: "Дано четырехзначное число. Проверить истинность высказывания: «Данное число читается одинаково слева направо и справа налево».",
			ro: "Se dă un număr de patru cifre. Verificați propoziția: „Numărul se citește la fel de la stânga la dreapta și de la dreapta la stânga”.",
		},
		stdin: "1221\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean24",
		number: 24,
		text: {
			en: 'Three real numbers A, B, C are given (A is not equal to 0). By means of a discriminant D = B² − 4·A·C, verify the following proposition: "The quadratic equation A·x² + B·x + C = 0 has real roots".',
			ru: "Даны числа A, B, C (число A не равно 0). Используя дискриминант D = B² − 4·A·C, проверить истинность высказывания: «Квадратное уравнение A·x² + B·x + C = 0 имеет вещественные корни».",
			ro: "Se dau numerele reale A, B, C (A este diferit de 0). Folosiți discriminantul D = B² − 4·A·C. Verificați propoziția: „Ecuația A·x² + B·x + C = 0 are rădăcini reale”.",
		},
		stdin: "1 -3 2\n",
		starter: `${HEAD}
int main() {
    double A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean25",
		number: 25,
		text: {
			en: 'Given two nonzero real numbers x, y, verify the following proposition: "The point with coordinates (x, y) is in the second coordinate quarter".',
			ru: "Даны ненулевые числа x, y. Проверить истинность высказывания: «Точка с координатами (x, y) лежит во второй координатной четверти».",
			ro: "Se dau numerele reale nenule x, y. Verificați propoziția: „Punctul de coordonate (x, y) se află în cadranul doi”.",
		},
		stdin: "-3 4\n",
		starter: `${HEAD}
int main() {
    double x, y;
    cin >> x >> y;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean26",
		number: 26,
		text: {
			en: 'Given two nonzero real numbers x, y, verify the following proposition: "The point with coordinates (x, y) is in the fourth coordinate quarter".',
			ru: "Даны ненулевые числа x, y. Проверить истинность высказывания: «Точка с координатами (x, y) лежит в четвертой координатной четверти».",
			ro: "Se dau numerele reale nenule x, y. Verificați propoziția: „Punctul de coordonate (x, y) se află în cadranul patru”.",
		},
		stdin: "3 -4\n",
		starter: `${HEAD}
int main() {
    double x, y;
    cin >> x >> y;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean27",
		number: 27,
		text: {
			en: 'Given two nonzero real numbers x, y, verify the following proposition: "The point with coordinates (x, y) is in the second or third coordinate quarter".',
			ru: "Даны ненулевые числа x, y. Проверить истинность высказывания: «Точка с координатами (x, y) лежит во второй или третьей координатной четверти».",
			ro: "Se dau numerele reale nenule x, y. Verificați propoziția: „Punctul de coordonate (x, y) se află în cadranul doi sau trei”.",
		},
		stdin: "-5 2\n",
		starter: `${HEAD}
int main() {
    double x, y;
    cin >> x >> y;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean28",
		number: 28,
		text: {
			en: 'Given two nonzero real numbers x, y, verify the following proposition: "The point with coordinates (x, y) is in the first or third coordinate quarter".',
			ru: "Даны ненулевые числа x, y. Проверить истинность высказывания: «Точка с координатами (x, y) лежит в первой или третьей координатной четверти».",
			ro: "Se dau numerele reale nenule x, y. Verificați propoziția: „Punctul de coordonate (x, y) se află în cadranul unu sau trei”.",
		},
		stdin: "3 4\n",
		starter: `${HEAD}
int main() {
    double x, y;
    cin >> x >> y;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean29",
		number: 29,
		text: {
			en: 'Given real numbers x, y, x1, y1, x2, y2, verify the following proposition: "The point (x, y) is inside of the rectangle whose left top vertex is (x1, y1), right bottom vertex is (x2, y2), and sides are parallel to coordinate axes".',
			ru: "Даны числа x, y, x1, y1, x2, y2. Проверить истинность высказывания: «Точка с координатами (x, y) лежит внутри прямоугольника, левая верхняя вершина которого имеет координаты (x1, y1), правая нижняя — (x2, y2), а стороны параллельны координатным осям».",
			ro: "Se dau numerele reale x, y, x1, y1, x2, y2. Verificați propoziția: „Punctul (x, y) se află în interiorul dreptunghiului cu vârful stânga-sus (x1, y1), vârful dreapta-jos (x2, y2) și laturile paralele cu axele”.",
		},
		stdin: "2 2 0 5 4 0\n",
		starter: `${HEAD}
int main() {
    double x, y, x1, y1, x2, y2;
    cin >> x >> y >> x1 >> y1 >> x2 >> y2;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean30",
		number: 30,
		text: {
			en: 'Given three integers a, b, c that are the sides of a triangle, verify the following proposition: "The triangle with sides a, b, c is equilateral".',
			ru: "Даны числа a, b, c, являющиеся длинами сторон треугольника. Проверить истинность высказывания: «Треугольник со сторонами a, b, c является равносторонним».",
			ro: "Se dau numerele a, b, c, lungimile laturilor unui triunghi. Verificați propoziția: „Triunghiul cu laturile a, b, c este echilateral”.",
		},
		stdin: "3 3 3\n",
		starter: `${HEAD}
int main() {
    int a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean31",
		number: 31,
		text: {
			en: 'Given three integers a, b, c that are the sides of a triangle, verify the following proposition: "The triangle with sides a, b, c is isosceles".',
			ru: "Даны числа a, b, c, являющиеся длинами сторон треугольника. Проверить истинность высказывания: «Треугольник со сторонами a, b, c является равнобедренным».",
			ro: "Se dau numerele a, b, c, lungimile laturilor unui triunghi. Verificați propoziția: „Triunghiul cu laturile a, b, c este isoscel”.",
		},
		stdin: "3 3 4\n",
		starter: `${HEAD}
int main() {
    int a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean32",
		number: 32,
		text: {
			en: 'Given three integers a, b, c that are the sides of a triangle, verify the following proposition: "The triangle with sides a, b, c is a right triangle".',
			ru: "Даны числа a, b, c, являющиеся длинами сторон треугольника. Проверить истинность высказывания: «Треугольник со сторонами a, b, c является прямоугольным».",
			ro: "Se dau numerele a, b, c, lungimile laturilor unui triunghi. Verificați propoziția: „Triunghiul cu laturile a, b, c este dreptunghic”.",
		},
		stdin: "3 4 5\n",
		starter: `${HEAD_CMATH}
int main() {
    int a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean33",
		number: 33,
		text: {
			en: 'Given three integers a, b, c, verify the following proposition: "A triangle with the sides a, b, c exists".',
			ru: "Даны числа a, b, c. Проверить истинность высказывания: «Существует треугольник со сторонами a, b, c».",
			ro: "Se dau numerele a, b, c. Verificați propoziția: „Există un triunghi cu laturile a, b, c”.",
		},
		stdin: "3 4 5\n",
		starter: `${HEAD}
int main() {
    int a, b, c;
    cin >> a >> b >> c;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean34",
		number: 34,
		text: {
			en: 'Given coordinates x, y of a chessboard square (as integers in the range 1 to 8), verify the following proposition: "The chessboard square (x, y) is white". Note that the left bottom square (1, 1) is black.',
			ru: "Даны координаты шахматного поля x, y (целые числа, лежащие в диапазоне 1–8). Учитывая, что левое нижнее поле доски (1, 1) является черным, проверить истинность высказывания: «Данное поле является белым».",
			ro: "Se dau coordonatele x, y ale unui câmp de șah (numere întregi între 1 și 8). Știind că câmpul din stânga-jos (1, 1) este negru, verificați propoziția: „Câmpul dat este alb”.",
		},
		stdin: "2 3\n",
		starter: `${HEAD}
int main() {
    int x, y;
    cin >> x >> y;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean35",
		number: 35,
		text: {
			en: 'Given coordinates x1, y1, x2, y2 of two chessboard squares (as integers in the range 1 to 8), verify the following proposition: "Both of the given chessboard squares have the same color".',
			ru: "Даны координаты двух шахматных полей x1, y1, x2, y2 (целые числа, лежащие в диапазоне 1–8). Проверить истинность высказывания: «Оба данных поля имеют одинаковый цвет».",
			ro: "Se dau coordonatele a două câmpuri de șah x1, y1, x2, y2 (numere întregi între 1 și 8). Verificați propoziția: „Ambele câmpuri au aceeași culoare”.",
		},
		stdin: "1 1 2 2\n",
		starter: `${HEAD}
int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean36",
		number: 36,
		text: {
			en: 'Given coordinates x1, y1, x2, y2 of two chessboard squares (as integers in the range 1 to 8), verify the following proposition: "A rook can move from one square to another during one turn".',
			ru: "Даны координаты двух шахматных полей x1, y1, x2, y2 (целые числа, лежащие в диапазоне 1–8). Проверить истинность высказывания: «Ладья за один ход может перейти с одного поля на другое».",
			ro: "Se dau coordonatele a două câmpuri de șah x1, y1, x2, y2 (numere întregi între 1 și 8). Verificați propoziția: „Tura poate muta de pe un câmp pe celălalt într-o singură mutare”.",
		},
		stdin: "1 1 1 8\n",
		starter: `${HEAD}
int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean37",
		number: 37,
		text: {
			en: 'Given coordinates x1, y1, x2, y2 of two chessboard squares (as integers in the range 1 to 8), verify the following proposition: "A king can move from one square to another during one turn".',
			ru: "Даны координаты двух шахматных полей x1, y1, x2, y2 (целые числа, лежащие в диапазоне 1–8). Проверить истинность высказывания: «Король за один ход может перейти с одного поля на другое».",
			ro: "Se dau coordonatele a două câmpuri de șah x1, y1, x2, y2 (numere întregi între 1 și 8). Verificați propoziția: „Regele poate muta de pe un câmp pe celălalt într-o singură mutare”.",
		},
		stdin: "4 4 5 5\n",
		starter: `${HEAD}
int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean38",
		number: 38,
		text: {
			en: 'Given coordinates x1, y1, x2, y2 of two chessboard squares (as integers in the range 1 to 8), verify the following proposition: "A bishop can move from one square to another during one turn".',
			ru: "Даны координаты двух шахматных полей x1, y1, x2, y2 (целые числа, лежащие в диапазоне 1–8). Проверить истинность высказывания: «Слон за один ход может перейти с одного поля на другое».",
			ro: "Se dau coordonatele a două câmpuri de șah x1, y1, x2, y2 (numere întregi între 1 și 8). Verificați propoziția: „Nebunul poate muta de pe un câmp pe celălalt într-o singură mutare”.",
		},
		stdin: "1 1 3 3\n",
		starter: `${HEAD}
int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean39",
		number: 39,
		text: {
			en: 'Given coordinates x1, y1, x2, y2 of two chessboard squares (as integers in the range 1 to 8), verify the following proposition: "A queen can move from one square to another during one turn".',
			ru: "Даны координаты двух шахматных полей x1, y1, x2, y2 (целые числа, лежащие в диапазоне 1–8). Проверить истинность высказывания: «Ферзь за один ход может перейти с одного поля на другое».",
			ro: "Se dau coordonatele a două câmpuri de șah x1, y1, x2, y2 (numere întregi între 1 și 8). Verificați propoziția: „Regina poate muta de pe un câmp pe celălalt într-o singură mutare”.",
		},
		stdin: "1 1 1 8\n",
		starter: `${HEAD}
int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
	{
		id: "Boolean40",
		number: 40,
		text: {
			en: 'Given coordinates x1, y1, x2, y2 of two chessboard squares (as integers in the range 1 to 8), verify the following proposition: "A knight can move from one square to another during one turn".',
			ru: "Даны координаты двух шахматных полей x1, y1, x2, y2 (целые числа, лежащие в диапазоне 1–8). Проверить истинность высказывания: «Конь за один ход может перейти с одного поля на другое».",
			ro: "Se dau coordonatele a două câmpuri de șah x1, y1, x2, y2 (numere întregi între 1 și 8). Verificați propoziția: „Calul poate muta de pe un câmp pe celălalt într-o singură mutare”.",
		},
		stdin: "1 1 2 3\n",
		starter: `${HEAD}
int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    // TODO: write your solution here
    bool result = false; // <-- your code here

    cout << result;
    return 0;
}
`,
	},
];
