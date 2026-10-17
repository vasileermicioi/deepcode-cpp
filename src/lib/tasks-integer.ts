import type { BeginTask } from "./tasks-begin";

const HEAD = `#include <iostream>
using namespace std;
`;

export const INTEGER_TASKS: BeginTask[] = [
	{
		id: "Integer1",
		number: 1,
		text: {
			en: "A distance L is given in centimeters. Find the number of full meters in it (1 m = 100 cm). Use integer division.",
			ru: "Дано расстояние L в сантиметрах. Найти количество полных метров в нем (1 м = 100 см). Использовать операцию целочисленного деления.",
			ro: "Se dă distanța L în centimetri. Aflați numărul de metri întregi din ea (1 m = 100 cm). Folosiți împărțirea întreagă.",
		},
		stdin: "250\n",
		starter: `${HEAD}
int main() {
    int L;
    cin >> L;

    // TODO: write your solution here
    int m = 0; // <-- your code here

    cout << m;
    return 0;
}
`,
	},
	{
		id: "Integer2",
		number: 2,
		text: {
			en: "A weight M is given in kilograms. Find the number of full tons in it (1 ton = 1000 kg). Use integer division.",
			ru: "Дана масса M в килограммах. Найти количество полных тонн в ней (1 тонна = 1000 кг). Использовать операцию целочисленного деления.",
			ro: "Se dă masa M în kilograme. Aflați numărul de tone întregi din ea (1 tonă = 1000 kg). Folosiți împărțirea întreagă.",
		},
		stdin: "2500\n",
		starter: `${HEAD}
int main() {
    int M;
    cin >> M;

    // TODO: write your solution here
    int t = 0; // <-- your code here

    cout << t;
    return 0;
}
`,
	},
	{
		id: "Integer3",
		number: 3,
		text: {
			en: "A file size is given in bytes. Find the number of full Kbytes in it (1 K = 1024 bytes). Use integer division.",
			ru: "Дан размер файла в байтах. Найти количество полных килобайтов в нем (1 Кбайт = 1024 байта). Использовать операцию целочисленного деления.",
			ro: "Se dă dimensiunea unui fișier în octeți. Aflați numărul de Kbytes întregi din ea (1 K = 1024 octeți). Folosiți împărțirea întreagă.",
		},
		stdin: "2048\n",
		starter: `${HEAD}
int main() {
    int bytes;
    cin >> bytes;

    // TODO: write your solution here
    int kbytes = 0; // <-- your code here

    cout << kbytes;
    return 0;
}
`,
	},
	{
		id: "Integer4",
		number: 4,
		text: {
			en: "Two positive integers A and B are given (A > B). A segment of length A contains the greatest possible number of inner segments of length B (without overlaps). Find the number of segments B placed on segment A. Use integer division.",
			ru: "Даны положительные числа A и B (A > B). На отрезке длины A размещено максимально возможное количество отрезков длины B (без наложений). Найти количество отрезков B, размещенных на отрезке A. Использовать операцию целочисленного деления.",
			ro: "Se dau două numere pozitive A și B (A > B). Pe segmentul de lungime A se plasează numărul maxim posibil de segmente de lungime B (fără suprapuneri). Aflați numărul de segmente B plasate pe segmentul A. Folosiți împărțirea întreagă.",
		},
		stdin: "10 3\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    int count = 0; // <-- your code here

    cout << count;
    return 0;
}
`,
	},
	{
		id: "Integer5",
		number: 5,
		text: {
			en: "Two positive integers A and B are given (A > B). A segment of length A contains the greatest possible number of inner segments of length B (without overlaps). Find the length of the unused part of segment A. Use the remainder operator.",
			ru: "Даны положительные числа A и B (A > B). На отрезке длины A размещено максимально возможное количество отрезков длины B (без наложений). Найти длину незанятой части отрезка A. Использовать операцию взятия остатка от деления.",
			ro: "Se dau două numere pozitive A și B (A > B). Pe segmentul de lungime A se plasează numărul maxim posibil de segmente de lungime B (fără suprapuneri). Aflați lungimea părții nefolosite a segmentului A. Folosiți operatorul rest.",
		},
		stdin: "10 3\n",
		starter: `${HEAD}
int main() {
    int A, B;
    cin >> A >> B;

    // TODO: write your solution here
    int unused = 0; // <-- your code here

    cout << unused;
    return 0;
}
`,
	},
	{
		id: "Integer6",
		number: 6,
		text: {
			en: "A two-digit integer is given. Output its left digit (tens) and then its right digit (ones). Use integer division for the tens digit and the remainder operator for the ones digit.",
			ru: "Дано двузначное число. Вывести сначала его левую цифру (десятки), а затем — его правую цифру (единицы). Для нахождения десятков использовать операцию целочисленного деления, для нахождения единиц — операцию взятия остатка от деления.",
			ro: "Se dă un număr de două cifre. Afișați mai întâi cifra din stânga (zecile), apoi cifra din dreapta (unitățile). Folosiți împărțirea întreagă pentru zeci și operatorul rest pentru unități.",
		},
		stdin: "42\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int tens = 0; // <-- your code here
    int ones = 0; // <-- your code here

    cout << tens << " " << ones;
    return 0;
}
`,
	},
	{
		id: "Integer7",
		number: 7,
		text: {
			en: "A two-digit integer is given. Find the sum and the product of its digits.",
			ru: "Дано двузначное число. Найти сумму и произведение его цифр.",
			ro: "Se dă un număr de două cifre. Aflați suma și produsul cifrelor sale.",
		},
		stdin: "42\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int sum = 0; // <-- your code here
    int prod = 0; // <-- your code here

    cout << sum << " " << prod;
    return 0;
}
`,
	},
	{
		id: "Integer8",
		number: 8,
		text: {
			en: "A two-digit integer is given. Output the integer obtained by exchanging its digits.",
			ru: "Дано двузначное число. Вывести число, полученное при перестановке цифр исходного числа.",
			ro: "Se dă un număr de două cifre. Afișați numărul obținut prin interschimbarea cifrelor sale.",
		},
		stdin: "42\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int reversed = 0; // <-- your code here

    cout << reversed;
    return 0;
}
`,
	},
	{
		id: "Integer9",
		number: 9,
		text: {
			en: "A three-digit integer is given. Using one integer division, find its first digit (hundreds).",
			ru: "Дано трехзначное число. Используя одну операцию целочисленного деления, найти его первую цифру (сотни).",
			ro: "Se dă un număr de trei cifre. Folosind o singură împărțire întreagă, aflați prima sa cifră (sutele).",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int hundreds = 0; // <-- your code here

    cout << hundreds;
    return 0;
}
`,
	},
	{
		id: "Integer10",
		number: 10,
		text: {
			en: "A three-digit integer is given. Output its last digit (ones) and then its middle digit (tens).",
			ru: "Дано трехзначное число. Вывести сначала его последнюю цифру (единицы), а затем — его среднюю цифру (десятки).",
			ro: "Se dă un număr de trei cifre. Afișați mai întâi ultima sa cifră (unitățile), apoi cifra din mijloc (zecile).",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int last = 0; // <-- your code here
    int middle = 0; // <-- your code here

    cout << last << " " << middle;
    return 0;
}
`,
	},
	{
		id: "Integer11",
		number: 11,
		text: {
			en: "A three-digit integer is given. Find the sum and the product of its digits.",
			ru: "Дано трехзначное число. Найти сумму и произведение его цифр.",
			ro: "Se dă un număr de trei cifre. Aflați suma și produsul cifrelor sale.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int sum = 0; // <-- your code here
    int prod = 0; // <-- your code here

    cout << sum << " " << prod;
    return 0;
}
`,
	},
	{
		id: "Integer12",
		number: 12,
		text: {
			en: "A three-digit integer is given. Output the integer obtained by reading it from right to left.",
			ru: "Дано трехзначное число. Вывести число, полученное при прочтении исходного числа справа налево.",
			ro: "Se dă un număr de trei cifre. Afișați numărul obținut prin citirea lui de la dreapta la stânga.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int reversed = 0; // <-- your code here

    cout << reversed;
    return 0;
}
`,
	},
	{
		id: "Integer13",
		number: 13,
		text: {
			en: "A three-digit integer is given. Output the integer obtained by moving its left digit to the right side.",
			ru: "Дано трехзначное число. В нем зачеркнули первую слева цифру и приписали ее справа. Вывести полученное число.",
			ro: "Se dă un număr de trei cifre. Afișați numărul obținut prin mutarea cifrei din stânga în partea dreaptă.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int moved = 0; // <-- your code here

    cout << moved;
    return 0;
}
`,
	},
	{
		id: "Integer14",
		number: 14,
		text: {
			en: "A three-digit integer is given. Output the integer obtained by moving its right digit to the left side.",
			ru: "Дано трехзначное число. В нем зачеркнули последнюю справа цифру и приписали ее слева. Вывести полученное число.",
			ro: "Se dă un număr de trei cifre. Afișați numărul obținut prin mutarea cifrei din dreapta în partea stângă.",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int moved = 0; // <-- your code here

    cout << moved;
    return 0;
}
`,
	},
	{
		id: "Integer15",
		number: 15,
		text: {
			en: "A three-digit integer is given. Output the integer obtained by exchanging the tens and hundreds digits (for example, 123 becomes 213).",
			ru: "Дано трехзначное число. Вывести число, полученное при перестановке цифр сотен и десятков исходного числа (например, 123 превратится в 213).",
			ro: "Se dă un număr de trei cifre. Afișați numărul obținut prin interschimbarea cifrelor zecilor și sutelor (de exemplu, 123 devine 213).",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int swapped = 0; // <-- your code here

    cout << swapped;
    return 0;
}
`,
	},
	{
		id: "Integer16",
		number: 16,
		text: {
			en: "A three-digit integer is given. Output the integer obtained by exchanging the ones and tens digits (for example, 123 becomes 132).",
			ru: "Дано трехзначное число. Вывести число, полученное при перестановке цифр десятков и единиц исходного числа (например, 123 превратится в 132).",
			ro: "Se dă un număr de trei cifre. Afișați numărul obținut prin interschimbarea cifrelor unităților și zecilor (de exemplu, 123 devine 132).",
		},
		stdin: "123\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int swapped = 0; // <-- your code here

    cout << swapped;
    return 0;
}
`,
	},
	{
		id: "Integer17",
		number: 17,
		text: {
			en: "An integer greater than 999 is given. Using one integer division and one remainder operation, find its hundreds digit.",
			ru: "Дано целое число, большее 999. Используя одну операцию целочисленного деления и одну операцию взятия остатка от деления, найти в нем цифру, соответствующую разряду сотен.",
			ro: "Se dă un număr întreg mai mare decât 999. Folosind o împărțire întreagă și un rest, aflați cifra sutelor sale.",
		},
		stdin: "1234\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int digit = 0; // <-- your code here

    cout << digit;
    return 0;
}
`,
	},
	{
		id: "Integer18",
		number: 18,
		text: {
			en: "An integer greater than 999 is given. Using one integer division and one remainder operation, find its thousands digit.",
			ru: "Дано целое число, большее 999. Используя одну операцию целочисленного деления и одну операцию взятия остатка от деления, найти в нем цифру, соответствующую разряду тысяч.",
			ro: "Se dă un număr întreg mai mare decât 999. Folosind o împărțire întreagă și un rest, aflați cifra miilor sale.",
		},
		stdin: "1234\n",
		starter: `${HEAD}
int main() {
    int n;
    cin >> n;

    // TODO: write your solution here
    int digit = 0; // <-- your code here

    cout << digit;
    return 0;
}
`,
	},
	{
		id: "Integer19",
		number: 19,
		text: {
			en: "N seconds have passed since the beginning of the day (N is integer). Find the number of full minutes passed since the beginning of the day.",
			ru: "С начала суток прошло N секунд (N — целое). Найти количество полных минут, прошедших с начала суток.",
			ro: "De la începutul zilei au trecut N secunde (N întreg). Aflați numărul de minute întregi trecute de la începutul zilei.",
		},
		stdin: "3600\n",
		starter: `${HEAD}
int main() {
    int N;
    cin >> N;

    // TODO: write your solution here
    int minutes = 0; // <-- your code here

    cout << minutes;
    return 0;
}
`,
	},
	{
		id: "Integer20",
		number: 20,
		text: {
			en: "N seconds have passed since the beginning of the day (N is integer). Find the number of full hours passed since the beginning of the day.",
			ru: "С начала суток прошло N секунд (N — целое). Найти количество полных часов, прошедших с начала суток.",
			ro: "De la începutul zilei au trecut N secunde (N întreg). Aflați numărul de ore întregi trecute de la începutul zilei.",
		},
		stdin: "3600\n",
		starter: `${HEAD}
int main() {
    int N;
    cin >> N;

    // TODO: write your solution here
    int hours = 0; // <-- your code here

    cout << hours;
    return 0;
}
`,
	},
	{
		id: "Integer21",
		number: 21,
		text: {
			en: "N seconds have passed since the beginning of the day (N is integer). Find the number of seconds passed since the beginning of the last minute.",
			ru: "С начала суток прошло N секунд (N — целое). Найти количество секунд, прошедших с начала последней минуты.",
			ro: "De la începutul zilei au trecut N secunde (N întreg). Aflați numărul de secunde trecute de la începutul ultimului minut.",
		},
		stdin: "65\n",
		starter: `${HEAD}
int main() {
    int N;
    cin >> N;

    // TODO: write your solution here
    int seconds = 0; // <-- your code here

    cout << seconds;
    return 0;
}
`,
	},
	{
		id: "Integer22",
		number: 22,
		text: {
			en: "N seconds have passed since the beginning of the day (N is integer). Find the number of seconds passed since the beginning of the last hour.",
			ru: "С начала суток прошло N секунд (N — целое). Найти количество секунд, прошедших с начала последнего часа.",
			ro: "De la începutul zilei au trecut N secunde (N întreg). Aflați numărul de secunde trecute de la începutul ultimei ore.",
		},
		stdin: "3661\n",
		starter: `${HEAD}
int main() {
    int N;
    cin >> N;

    // TODO: write your solution here
    int seconds = 0; // <-- your code here

    cout << seconds;
    return 0;
}
`,
	},
	{
		id: "Integer23",
		number: 23,
		text: {
			en: "N seconds have passed since the beginning of the day (N is integer). Find the number of full minutes passed since the beginning of the last hour.",
			ru: "С начала суток прошло N секунд (N — целое). Найти количество полных минут, прошедших с начала последнего часа.",
			ro: "De la începutul zilei au trecut N secunde (N întreg). Aflați numărul de minute întregi trecute de la începutul ultimei ore.",
		},
		stdin: "3661\n",
		starter: `${HEAD}
int main() {
    int N;
    cin >> N;

    // TODO: write your solution here
    int minutes = 0; // <-- your code here

    cout << minutes;
    return 0;
}
`,
	},
	{
		id: "Integer24",
		number: 24,
		text: {
			en: "Days of week are numbered as: 0 — Sunday, 1 — Monday, 2 — Tuesday, …, 6 — Saturday. An integer K in the range 1 to 365 is given. Find the weekday number of the K-th day of the year, given that January 1 was Monday.",
			ru: "Дни недели пронумерованы следующим образом: 0 — воскресенье, 1 — понедельник, 2 — вторник, …, 6 — суббота. Дано целое число K, лежащее в диапазоне 1–365. Определить номер дня недели для K-го дня года, если известно, что 1 января был понедельник.",
			ro: "Zilele săptămânii sunt numerotate: 0 — duminică, 1 — luni, 2 — marți, …, 6 — sâmbătă. Se dă un număr întreg K între 1 și 365. Aflați numărul zilei săptămânii pentru ziua K a anului, știind că 1 ianuarie a fost luni.",
		},
		stdin: "1\n",
		starter: `${HEAD}
int main() {
    int K;
    cin >> K;

    // TODO: write your solution here
    int weekday = 0; // <-- your code here

    cout << weekday;
    return 0;
}
`,
	},
	{
		id: "Integer25",
		number: 25,
		text: {
			en: "Days of week are numbered as: 0 — Sunday, 1 — Monday, 2 — Tuesday, …, 6 — Saturday. An integer K in the range 1 to 365 is given. Find the weekday number of the K-th day of the year, given that January 1 was Thursday.",
			ru: "Дни недели пронумерованы следующим образом: 0 — воскресенье, 1 — понедельник, 2 — вторник, …, 6 — суббота. Дано целое число K, лежащее в диапазоне 1–365. Определить номер дня недели для K-го дня года, если известно, что 1 января был четверг.",
			ro: "Zilele săptămânii sunt numerotate: 0 — duminică, 1 — luni, 2 — marți, …, 6 — sâmbătă. Se dă un număr întreg K între 1 și 365. Aflați numărul zilei săptămânii pentru ziua K a anului, știind că 1 ianuarie a fost joi.",
		},
		stdin: "1\n",
		starter: `${HEAD}
int main() {
    int K;
    cin >> K;

    // TODO: write your solution here
    int weekday = 0; // <-- your code here

    cout << weekday;
    return 0;
}
`,
	},
	{
		id: "Integer26",
		number: 26,
		text: {
			en: "Days of week are numbered as: 1 — Monday, 2 — Tuesday, …, 6 — Saturday, 7 — Sunday. An integer K in the range 1 to 365 is given. Find the weekday number of the K-th day of the year, given that January 1 was Tuesday.",
			ru: "Дни недели пронумерованы следующим образом: 1 — понедельник, 2 — вторник, …, 6 — суббота, 7 — воскресенье. Дано целое число K, лежащее в диапазоне 1–365. Определить номер дня недели для K-го дня года, если известно, что 1 января был вторник.",
			ro: "Zilele săptămânii sunt numerotate: 1 — luni, 2 — marți, …, 6 — sâmbătă, 7 — duminică. Se dă un număr întreg K între 1 și 365. Aflați numărul zilei săptămânii pentru ziua K a anului, știind că 1 ianuarie a fost marți.",
		},
		stdin: "1\n",
		starter: `${HEAD}
int main() {
    int K;
    cin >> K;

    // TODO: write your solution here
    int weekday = 0; // <-- your code here

    cout << weekday;
    return 0;
}
`,
	},
	{
		id: "Integer27",
		number: 27,
		text: {
			en: "Days of week are numbered as: 1 — Monday, 2 — Tuesday, …, 6 — Saturday, 7 — Sunday. An integer K in the range 1 to 365 is given. Find the weekday number of the K-th day of the year, given that January 1 was Saturday.",
			ru: "Дни недели пронумерованы следующим образом: 1 — понедельник, 2 — вторник, …, 6 — суббота, 7 — воскресенье. Дано целое число K, лежащее в диапазоне 1–365. Определить номер дня недели для K-го дня года, если известно, что 1 января была суббота.",
			ro: "Zilele săptămânii sunt numerotate: 1 — luni, 2 — marți, …, 6 — sâmbătă, 7 — duminică. Se dă un număr întreg K între 1 și 365. Aflați numărul zilei săptămânii pentru ziua K a anului, știind că 1 ianuarie a fost sâmbătă.",
		},
		stdin: "1\n",
		starter: `${HEAD}
int main() {
    int K;
    cin >> K;

    // TODO: write your solution here
    int weekday = 0; // <-- your code here

    cout << weekday;
    return 0;
}
`,
	},
	{
		id: "Integer28",
		number: 28,
		text: {
			en: "Days of week are numbered as: 1 — Monday, 2 — Tuesday, …, 6 — Saturday, 7 — Sunday. An integer K in the range 1 to 365 and an integer N in the range 1 to 7 are given. Find the weekday number of the K-th day of the year, given that January 1 was the N-th day of the week.",
			ru: "Дни недели пронумерованы следующим образом: 1 — понедельник, 2 — вторник, …, 6 — суббота, 7 — воскресенье. Дано целое число K, лежащее в диапазоне 1–365, и целое число N, лежащее в диапазоне 1–7. Определить номер дня недели для K-го дня года, если известно, что 1 января было днем недели с номером N.",
			ro: "Zilele săptămânii sunt numerotate: 1 — luni, 2 — marți, …, 6 — sâmbătă, 7 — duminică. Se dau un număr întreg K între 1 și 365 și un număr întreg N între 1 și 7. Aflați numărul zilei săptămânii pentru ziua K a anului, știind că 1 ianuarie a fost ziua N a săptămânii.",
		},
		stdin: "1 1\n",
		starter: `${HEAD}
int main() {
    int K, N;
    cin >> K >> N;

    // TODO: write your solution here
    int weekday = 0; // <-- your code here

    cout << weekday;
    return 0;
}
`,
	},
	{
		id: "Integer29",
		number: 29,
		text: {
			en: "Three positive integers A, B, C are given. A rectangle of size A × B contains the greatest possible number of inner squares with side C (without overlaps). Find the number of squares placed on the rectangle and the area of its unused part.",
			ru: "Даны положительные числа A, B, C. На прямоугольнике размера A × B размещено максимально возможное количество квадратов со стороной C (без наложений). Найти количество квадратов, размещенных на прямоугольнике, и площадь незанятой части прямоугольника.",
			ro: "Se dau trei numere pozitive A, B, C. Pe dreptunghiul de dimensiune A × B se plasează numărul maxim posibil de pătrate cu latura C (fără suprapuneri). Aflați numărul de pătrate plasate și aria părții nefolosite a dreptunghiului.",
		},
		stdin: "10 10 3\n",
		starter: `${HEAD}
int main() {
    int A, B, C;
    cin >> A >> B >> C;

    // TODO: write your solution here
    int count = 0; // <-- your code here
    int unused = 0; // <-- your code here

    cout << count << " " << unused;
    return 0;
}
`,
	},
	{
		id: "Integer30",
		number: 30,
		text: {
			en: "A year is given (as a positive integer). Find the number of its century. Note that, for example, the 20th century began with the year 1901.",
			ru: "Дан номер некоторого года (положительное целое число). Определить соответствующий ему номер столетия, учитывая, что, к примеру, началом 20-го столетия был 1901 год.",
			ro: "Se dă un an (număr întreg pozitiv). Aflați numărul secolului corespunzător. De exemplu, secolul 20 a început cu anul 1901.",
		},
		stdin: "1901\n",
		starter: `${HEAD}
int main() {
    int year;
    cin >> year;

    // TODO: write your solution here
    int century = 0; // <-- your code here

    cout << century;
    return 0;
}
`,
	},
];
