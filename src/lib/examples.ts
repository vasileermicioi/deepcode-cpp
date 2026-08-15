export type ExampleProgram = {
	id: string;
	name: string;
	source: string;
};

export const EXAMPLES: ExampleProgram[] = [
	{
		id: "hello",
		name: "Hello, C++",
		source: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
	std::vector<int> nums{5, 2, 9, 1, 7};
	std::sort(nums.begin(), nums.end());

	std::cout << "Sorted:";
	for (int n : nums) {
		std::cout << " " << n;
	}
	std::cout << "\\nHello from C++ in the browser!\\n";
	return 0;
}
`,
	},
	{
		id: "fibonacci",
		name: "Fibonacci",
		source: `#include <iostream>

int fib(int n) {
	if (n <= 1) {
		return n;
	}
	return fib(n - 1) + fib(n - 2);
}

int main() {
	for (int i = 0; i <= 12; ++i) {
		std::cout << "fib(" << i << ") = " << fib(i) << "\\n";
	}
	return 0;
}
`,
	},
	{
		id: "cin-sum",
		name: "cin sum",
		source: `#include <iostream>
using namespace std;

int main() {
	int a, b, c;
	cin >> a >> b;
	c = a + b;
	cout << c;
	return 0;
}
`,
	},
	{
		id: "printf",
		name: "C stdio",
		source: `#include <stdio.h>

int main() {
	for (int i = 1; i <= 5; ++i) {
		printf("line %d: 2^%d = %d\\n", i, i, 1 << i);
	}
	puts("done");
	return 0;
}
`,
	},
	{
		id: "templates",
		name: "Templates",
		source: `#include <iostream>
#include <string>

template <typename T>
T twice(T value) {
	return value + value;
}

int main() {
	std::cout << twice(21) << "\\n";
	std::cout << twice(std::string("na")) << " batman\\n";
	return 0;
}
`,
	},
];

export const DEFAULT_SOURCE = EXAMPLES[0].source;
