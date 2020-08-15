# CODESYS (IEC 61131-3) for Beginners - Part 2

Table of Contents

* [Comments](#Comments)
* [Execution Priority](#Execution-Priority)
* [Conditions](#Conditions)
* [Program Flow](#Program-Flow)

## Comments

* Multi-line (\* \*)

    ```txt
    (*
    ----------
    My Comment
    Motor 1
    *)
    ```

* Single-line //

    ```txt
    //My Comment
    ```

## Execution Priority

1. Parentheses ()
2. Operations on an operand, example, SIN(x) or ABS(Y)
3. Negative (−) and NOT
4. *, / , MOD
5. +, −
6. <, >, ≤, ≥
7. =, ≠
8. AND
9. XOR
10. OR
