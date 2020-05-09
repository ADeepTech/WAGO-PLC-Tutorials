# CODESYS (IEC 61131-3) for Beginners - Part 1

Table of Contents

* [Introduction](#Introduction)
* [Data Type](#Data-Type)
  * [Integer](#Integer)
  * [Real (Floating-point)](#Real-(Floating-point))
  * [Character / Character string](#Character-/-Character-string)
  * [Bit string](#Bit-string)
  * [Boolean](#Boolean)
  * [Date/Time](#Date/Time)
* [Identifiers](#Identifiers)
  * [Rules of naming identifiers](#Rules-of-naming-identifiers)
  * [Example of correct Identifiers](#Example-of-correct-Identifiers)
  * [Example of incorrect identifiers](#Example-of-incorrect-identifiers)
* [Literals](#Literals)
  * [Integer Literals](#Integer-Literals)
  * [Time Literals](#Time-Literals)
  * [Date/Time Literals](#Date/Time-Literals)
  * [Character string Literals](#Character-string-Literal)
* [Variables](#Variables)
  * [Variables Syntax](#Variables-Syntax)
  * [Example Variables](#Example-Variables)
* [Array](#Array)
* [Data Structure](#Data-Structure)

## Introduction

CODESYS is a development environment for programming controller applications in line with the IEC 61131-3 standard.

IEC 61131-3 defines three graphical and two textual programming language standards

* IL (Instruction List, text) is an assembler like programming language (Is now deprecated but available for backward compatibility)  
* ST (Structured Text, text) is similar to programming in Pascal or C
* LD (Ladder Diagram, graphic) enables the programmer to virtually combine relay contacts and coils
* FBD (Function Block Diagram, graphic) enables the user to rapidly program both Boolean and analogue expressions
* SFC (Sequential Function Chart, graphic) is convenient for programming sequential processes and flows

Additional graphical editor available in CODESYS not defined in the IEC standard:
CFC (Continuous Function Chart, graphical) is a sort of freehand FBD editor. Other than in the network-oriented FBD editor where the connections between inputs, operators and outputs are set automatically they have to be drawn by the programmer. All boxes can be placed freely which makes it possible to program feedback loops without interim variables.

## Data Type

### Integer

| Data type   | Description             | Minimum value   | Maximum value    | Memory size   |
| ----------- | ----------------------- | --------------- | ---------------- | ------------- |
| SINT        | Signed Short Integer    |            -128 |              127 | 1 byte        |
| INT         | Signed Integer          |          -32768 |            32767 | 2 bytes       |
| DINT        | Signed Double Integer   |     -2147483648 |       2147483647 | 4 bytes       |
| LINT        | Signed Long Integer     | -2<sup>63</sup> | 2<sup>63</sup>-1 | 8 bytes       |
| USINT       | Unsigned Short Integer  |               0 |              255 | 1 byte        |
| UINT        | Unsigned Integer        |               0 |            65535 | 2 bytes       |
| UDINT       | Unsigned Double Integer |               0 |       4294967295 | 4 bytes       |
| ULINT       | Unsigned Long Integer   |               0 | 2<sup>64</sup>-1 | 8 bytes       |

### Real (Floating-point)

| Data type   | Description             | Minimum value            | Maximum value           | Memory size   |
| ----------- | ----------------------- | ------------------------ | ----------------------- | ------------- |
| REAL        | Real (Float)            |            -3.402823e+38 |            3.402823e+38 | 4 bytes       |
| LREAL       | Long Real (Double)      | -1.7976931348623158e+308 | 1.7976931348623158e+308 | 8 bytes       |

### Character / Character string

| Data type   | Description               | Memory size                           |
| ----------- | ------------------------- | ------------------------------------- |
| CHAR        | Single character          | 1 byte                                |
| WCHAR       | Single character          | 2 bytes                               |
| STRING      | Variable-length character | Variable-length single-byte character |
| WSTRING     | Variable-length character | Variable-length single-byte character |

### Bit string

| Data type   | Description   | Memory size   |
| ----------- | ------------- | ------------- |
| BYTE        | 8 bit binary  | 1 byte        |
| WORD        | 16 bit binary | 2 bytes       |
| DWORD       | 32 bit binary | 4 bytes       |
| LWORD       | 64 bit binary | 8 bytes       |

### Boolean

| Data type   | Description  | Memory size   |
| ----------- | ------------ | ------------- |
| BOOL        | 0/FALSE      | 1 bit         |

### Date/Time

| Data type           | Description               | Initial value    |
| ------------------- | ------------------------- | ---------------- |
| TIME                | Duration                  | T#0s             |
| LTIME               | Duration                  | LTIME#0s         |
| DATE                | Calendar date             | –                |
| LDATE               | Calendar date             | LDATE#1970‐01‐01 |
| TIME_OF_DAY or TOD  | Time of day               | TOD#00:00:00     |
| DATE_AND_TIME or DT | Date and time of day      | –                |

## Identifiers

### Rules of naming identifiers

* Motor, motor, and mOtOr are refered as same identifier.
* Begin with a letter or an _ (underscore).
* Numbers are allowed. But cannot put in first character.
* Cannot contain a space.
* Cannot end with an underscore or have two underscores.

### Example of correct Identifiers

* MoTor
* _Motor
* Mo_tor
* Motor_lvl2_3

### Example of incorrect identifiers

* motor__1 (two underscores)
* 1_motor (numbers first)
* Motor 1 (space)
* Motor_ (ends with underscore)

## Literals

### Integer Literals

| Decimal              | Binary               | Octal                | Hexadecimal          |
| -------------------- | -------------------- | -------------------- | -------------------- |
| 0                    | 2#00000000           | 8#000                | 16#00                |
| 38                   | 2#0010_0110‬          | 8#046                | 16#26                |
| -17                  | -2#0001_0001 or      | −8#21 or             | -16#11               |
|                      | 2#1110_1111          | 8#357                | 16#EF               ||

### Time Literals

| Date/Time  | Description  |
| ---------- | ------------ |
| d          | days         |
| h          | hours        |
| m          | minutes      |
| s          | seconds      |
| ms         | milliseconds |

#### Example Time Literals

* T*#30s
* T#‐25s (negative time)
* T#12.4ms
* t#12h
* T#12h23m42s
* t#12h_23m_42s_67ms

### Date/Time Literals

The literal should follow the form:

* DATE or D # Year ‐ Month no. ‐ Day no.

* TIME_OF_DAY (TOD):  
  TIME_OF_DAY or TOD # Hours : Minutes : Seconds
  (Note that hours, minutes, and seconds are separated by a colon, while year, month, and day  
  are separated by a hyphen.)

* DATE_AND_TIME (DT):  
  DATE_AND_TIME or DT # DATE‐literal ‐ TOD‐literal

#### Example Date/Time Literals

* DATE#2020‐09‐30
* D#1987‐11‐17
* time_of_day#14:25:00
* TOD#17:30:45
* DATE_AND_TIME#2020‐10‐02‐13:45:00
* dt#2020‐05‐09‐17:08:00

### Character string Literal

Single quote ' is used for CHAR and STRING.  
Double quotes " is used for WCHAR and WSTRING.  

#### Example Character string Literal

aString := 'This is a STRING'  
aWString := "This is a WSTRING"  

## Variables

| Types         | Description                            |
| ------------- | -------------------------------------- |
| VAR           | Local variables                        |
| VAR_GLOBAL    | Global variables outside of POU*       |
| VAR_INPUT     | Pass variables into POU*               |
| VAR_OUTPUT    | Return variables from POU*             |
| VAR_IN_OUT    | Pass and return variables from POU*    |
| VAR_EXTERNAL  | Access Global variables from POU*      |
| VAR_STAT      | Static variables                       |
| VAR_TEMP      | Variables deleted after POU* exit      |
| VAR_INST      | Only for methods of a function block   |
| VAR_CONFIG    | I/O addresses                          |
| VAR_ACCESS    | Direct access to hardware variables    |
> \* POU - Program Organization Unit

### Variables Syntax

```txt
VAR_TYPE
  VAR NAME : ARRAY [lower..upper] OF DATATYPE;
  VAR NAME : ARRAY [lower1..upper1, lower2..upper2] OF DATATYPE;
END_VAR_TYPE
```

### Example Variables

```txt
VAR
  xJsonParseTrigger : BOOL := TRUE;
END_VAR

VAR_INPUT
  udiSizeData : UDINT;
  sPointer : STRING(255);
END_VAR

VAR_OUTPUT
  xBusy : BOOL;
  xError : BOOL;
  sStatus : STRING;
END_VAR
```

## Constants and Retain

```txt
VAR CONSTANT
  Setpoint : INT := 75;
END_VAR
```

```txt
VAR RETAIN
  Setpoint : INT := 75;
END_VAR
```

## Array

### Array Syntax

```txt
TYPE
  Tab_1dim : ARRAY [lower..upper] OF DATATYPE;
  Tab_2dim : ARRAY [lower1..upper1, lower2..upper2] OF DATATYPE;
END_TYPE
```

### Example defining Array Data Types

```txt
VAR
  One_dim: ARRAY [0..9] OF USINT;
  Two_dim: ARRAY [1..2, 1..5] OF INT;
  Three_dim: ARRAY [0..3, 0..3, 0..3] OF REAL;
END_VAR
```

## Data Structure

Declared with the following syntax :

```txt
TYPE Name_of_datatype:
  STRUCT
    <Declaration of datatype 1>;
    <Declaration of datatype 2>;
    <Declaration of datatype n>;
  END_STRUCT
END_TYPE
```

### Example declaration of Data Structure

```txt
TYPE MOTOR_SIGNAL:
    STRUCT
        Raw_value : WORD;
        Scaled_value : REAL;
        Min_raw : INT (‐32767..0);
        Max_raw : UINT (0..32768)
    END_STRUCT
END_TYPE
```

## Data Type Conversion

### Example From Boolean to Other Data Types

B := BOOL_TO_INT(TRUE); (\* Result: 1 \*)  
O := BOOL_TO_STRING(TRUE); (\* Result: 'TRUE' \*)  
RI := BOOL_TO_TIME(TRUE); (\* Result: T#1ms \*)  
N := BOOL_TO_TOD(TRUE); (\* Result: TOD#00:00:00.001 \*)  
G := BOOL_TO_DATE(FALSE); (\* Result: D#1970‐01‐01 \*)  

### Example From Floating‐Point to Other Data Types

J := REAL_TO_INT(7.5); (\* Result: J = 8 \*)  
A := REAL_TO_INT(7.4); (\* Result: A = 7 \*)  
C := REAL_TO_INT(−7.5); (\* Result: C = −8 \*)  
K := REAL_TO_STRING(35.27) (\* Result: K = '35.27' \*)  

B := TRUNC_INT(−23.6) (\* Result: B = −23 \*)  
B := REAL_TO_INT(−23.6) (\* Result: B = −24 \*)  
