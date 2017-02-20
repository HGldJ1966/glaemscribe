Glaemscribe.resource_manager.raw_modes["telerin"] = "\\**\n\nGlǽmscribe (also written Glaemscribe) is a software dedicated to\nthe transcription of texts between writing systems, and more \nspecifically dedicated to the transcription of J.R.R. Tolkien\'s \ninvented languages to some of his devised writing systems.\n\nCopyright (C) 2015 Benjamin Babut (Talagan).\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU Affero General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\nany later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Affero General Public License for more details.\n\nYou should have received a copy of the GNU Affero General Public License\nalong with this program.  If not, see <http://www.gnu.org/licenses/>.\n\n**\\\n\n\\** Telerin mode for glaemscribe (MAY BE INCOMPLETE) - Derived from Quenya **\\\n\n\\beg changelog\n  \\entry \"0.0.2\" \"Correcting ts/ps sequences to work better with eldamar\"\n  \\entry \"0.0.3\" \"Porting to virtual chars\"\n  \\entry \"0.0.4\" \"Added charset support for Annatar\"\n  \\entry \"0.0.5\" \"Added support for the FreeMonoTengwar font\" \n\\end\n\n\\language \"Telerin\"\n\\writing  \"Tengwar\"\n\\mode     \"Glaemscrafu\"\n\\version  \"0.0.4\"\n\\authors  \"Talagan (Benjamin Babut), based on J.R.R Tolkien\"\n\n\\charset  tengwar_ds_sindarin true\n\\charset  tengwar_ds_parmaite false\n\\charset  tengwar_ds_eldamar  false\n\\charset  tengwar_ds_annatar  false\n\\charset  tengwar_freemono    false\n\n\n\\beg      options\n  \\option reverse_numbers true\n  \\beg option numbers_base BASE_12\n    \\value    BASE_10 10\n    \\value    BASE_12 12\n  \\end\n\\end\n\n\\beg      preprocessor\n  \\** Work exclusively downcase **\\\n  \\downcase\n  \n  \\** Simplify trema vowels **\\\n  \\substitute ä a\n  \\substitute ë e\n  \\substitute ï i\n  \\substitute ö o\n  \\substitute ü u\n  \\substitute ÿ y\n  \n  \\** Dis-ambiguate long vowels **\\\n  \\rxsubstitute \"(ā|â|aa)\" \"á\"\n  \\rxsubstitute \"(ē|ê|ee)\" \"é\" \n  \\rxsubstitute \"(ī|î|ii)\" \"í\"\n  \\rxsubstitute \"(ō|ô|oo)\" \"ó\"\n  \\rxsubstitute \"(ū|û|uu)\" \"ú\"\n  \\rxsubstitute \"(ȳ|ŷ|yy)\" \"ý\"\n\n  \\substitute   \"qu\" \"q\" \\** Dis-ambiguate qu **\\\n  \n  \\elvish_numbers \"\\\\eval numbers_base\" \"\\\\eval reverse_numbers\"\n\\end\n  \n\\beg processor\n\n  \\beg rules litteral\n    {A}                 === a\n    {AA}                === á\n    {E}                 === e\n    {EE}                === é\n    {I}                 === i\n    {II}                === í\n    {O}                 === o\n    {OO}                === ó\n    {U}                 === u\n    {UU}                === ú\n    \n    {AI}                === {A}{I}\n    {AU}                === {A}{U}\n    {EU}                === {E}{U}\n    {IU}                === {I}{U}\n    {OI}                === {O}{I}\n    {UI}                === {U}{I}\n\n                      \n    {K}                 === (c,k)\n    {W}                 === (v,w)\n    {SS}                === (z,ss)\n    \n    \\** {MB}                === (b,mb) **\\\n    \\** {SS}                === (z,ss) **\\\n  \n    {VOWELS}            === {A}           * {E}         * {I}           * {O}           * {U}\n    {LVOWELS}           === {AA}          * {EE}        * {II}          * {OO}          * {UU}\n    \n    {TEHTAR}            === A_TEHTA      * E_TEHTA      * I_TEHTA    * O_TEHTA     * U_TEHTA\n       \n    {DIPHTHONGS}         === {AI}             * {AU}            * {EU}            *  {IU}           * {OI}            * {UI}\n    {_DIPHTHONGS_}       === YANTA A_TEHTA    * URE A_TEHTA     * URE E_TEHTA     * URE I_TEHTA     * YANTA O_TEHTA   * YANTA U_TEHTA\n\n\n    {V_D}         === [ {VOWELS}   * {DIPHTHONGS} ]\n    {_V_D_}       === [ {TEHTAR} * {_DIPHTHONGS_} ]\n    \n    {V_D_WN}      === [ {VOWELS} * {DIPHTHONGS} * {NULL} ]  \n    {_V_D_WN_}    === [ {TEHTAR} * {_DIPHTHONGS_} * {NULL} ]\n \n    \\** VOWEL RULES **\\\n    [{VOWELS}]        -->   TELCO[{TEHTAR}] \\** Replace isolated short vowels **\\\n    [{LVOWELS}]       -->   ARA[{TEHTAR}] \\**  Replace long vowels **\\\n    [{DIPHTHONGS}]     -->  [{_DIPHTHONGS_}]  \\**  Replace diphthongs **\\\n\n    \\** TELERIN: changed v/w, removed all y rules **\\\n    \n    \\** ===================== **\\\n    \\** 1ST LINE RULES **\\\n    \\** ===================== **\\\n    {L1}          === {K}   * q      * t       * p \n    {_L1_}        === CALMA * QUESSE * TINCO   * PARMA\n    \n    {L1_GEMS}     === {K}{K}              * tt                     * pp\n    {_L1_GEMS_}   === CALMA GEMINATE_SIGN * TINCO GEMINATE_SIGN    * PARMA GEMINATE_SIGN\n\n    \\** NORMAL **\\\n    [ {L1} ] {V_D_WN}         --> [ {_L1_} ] {_V_D_WN_}\n    [ {L1_GEMS} ] {V_D_WN}    --> [ {_L1_GEMS_} ] {_V_D_WN_}\n                            \n    ts{V_D_WN}          --> TINCO {_V_D_WN_} ALVEOLAR_SIGN\n    ps{V_D_WN}          --> PARMA {_V_D_WN_} ALVEOLAR_SIGN\n    {K}s{V_D_WN}        --> CALMA ALVEOLAR_SIGN {_V_D_WN_}   \n    x{V_D_WN}           --> CALMA ALVEOLAR_SIGN {_V_D_WN_}   \\** render ks for x **\\\n                            \n    \\** ===================== **\\\n    \\** 2ND LINE RULES **\\\n    \\** ===================== **\\\n    {L2}        === nd      * mb        * ng      *  ngw    * d      * b        * g\n    {_L2_}      === ANDO    * UMBAR     * ANGA    *  UNGWE  * ORE    * VALA     * ANNA\n    \n    \\** STANDARD **\\\n    [{L2}]{V_D_WN}  --> [{_L2_}]{_V_D_WN_}\n\n    \\** ===================== **\\\n    \\** 3RD LINE RULES **\\\n    \\** ===================== **\\\n    {L3}    === th     * f      * h      * hw\n    {_L3_}  === SULE   * FORMEN * AHA    * HWESTA\n\n    \\** NORMAL **\\\n    [{L3}]{V_D_WN}  --> [{_L3_}]{_V_D_WN_}\n      \n    \\** Override h with vowels (descendent) **\\\n    _h{V_D}                     --> HYARMEN {_V_D_}\n    h[{LVOWELS}]                --> HYARMEN ARA [{TEHTAR}] \n    h                           --> AHA\n\n    \\** ===================== **\\\n    \\** 4TH LINE RULES **\\\n    \\** ===================== **\\\n    {L4}    === nt    * mp    * nc    * nq      \\** Not nqu, due to preprocessor **\\\n    {_L4_}  === ANTO  * AMPA  * ANCA  * UNQUE\n \n    \\** NORMAL **\\\n    [{L4}]{V_D_WN}    --> [{_L4_}]{_V_D_WN_}\n\n    \\** ===================== **\\\n    \\** 5TH LINE RULES **\\\n    \\** ===================== **\\\n    {L5}    === n     * m     * ñ     * ñw      * _nw \n    {_L5_}  === NUMEN * MALTA * NOLDO * NWALME  * NWALME\n\n    [{L5}]{V_D_WN}  --> [{_L5_}]{_V_D_WN_}\n\n    nn{V_D_WN}          --> NUMEN GEMINATE_SIGN {_V_D_WN_}\n    mm{V_D_WN}          --> MALTA GEMINATE_SIGN {_V_D_WN_}\n\n    \\** ===================== **\\\n    \\** 6TH LINE RULES **\\\n    \\** ===================== **\\\n    {L6}        === r     * {W}  \n    {_L6_}      === ROMEN * VILYA \n\n    [{L6}]{V_D_WN} --> [{_L6_}]{_V_D_WN_}\n\n    rr{V_D_WN}        --> ROMEN GEMINATE_SIGN {_V_D_WN_}\n    rd{V_D_WN}        --> ARDA {_V_D_WN_}\n\n    \\** ===================== **\\\n    \\** L   LINE RULES **\\\n    \\** ===================== **\\\n    {LINE_L}          === l     * ld      * ll\n    {_LINE_L_}        === LAMBE * ALDA    * LAMBE GEMINATE_SIGN\n\n    [{LINE_L}]{V_D_WN}    --> [{_LINE_L_}]{_V_D_WN_}\n    hl{V_D_WN}            --> HALLA LAMBE {_V_D_WN_}\n    hr{V_D_WN}            --> HALLA ROMEN {_V_D_WN_}\n\n    \\** ===================== **\\\n    \\** S/Z LINE RULES **\\\n    \\** ===================== **\\\n    {L8}        === s               * {SS}   \n    {_L8_}      === SILME_NUQUERNA  * ESSE_NUQUERNA \n\n    [{L8}]{V_D_WN} --> [{_L8_}]{_V_D_WN_}\n\n    \\** Override lonely s / ss / before consonant **\\\n    s               --> SILME\n    s[{LVOWELS}]    --> SILME ARA [{TEHTAR}] \n    {SS}            --> ESSE\n    {SS}[{LVOWELS}] --> ESSE ARA [{TEHTAR}] \n  \\end\n  \n  \\beg rules punctuation\n    . --> PUNCT_DDOT\n    .. --> PUNCT_DOT PUNCT_DDOT PUNCT_DOT\n    …  --> PUNCT_TILD\n    ... --> PUNCT_TILD\n    .... --> PUNCT_TILD\n    ..... --> PUNCT_TILD\n    ...... --> PUNCT_TILD\n    ....... --> PUNCT_TILD\n\n    , --> PUNCT_DOT\n    : --> PUNCT_DOT\n    ; --> PUNCT_DOT\n    ! --> PUNCT_EXCLAM\n    ? --> PUNCT_INTERR\n    · --> PUNCT_DOT\n\n    \\** Apostrophe **\\\n\n    \' --> {NULL}\n    ’ --> {NULL}\n\n    \\** Quotes **\\\n\n    “ --> DQUOT_OPEN\n    ” --> DQUOT_CLOSE\n    « --> DQUOT_OPEN \n    » --> DQUOT_CLOSE \n    \n    - --> {NULL}\n    – --> PUNCT_TILD  \n    — --> PUNCT_TILD\n\n    [ --> PUNCT_PAREN_L\n    ] --> PUNCT_PAREN_R\n    ( --> PUNCT_PAREN_L\n    ) --> PUNCT_PAREN_R\n    { --> PUNCT_PAREN_L\n    } --> PUNCT_PAREN_R\n    < --> PUNCT_PAREN_L\n    > --> PUNCT_PAREN_R  \n\n    \\** Not universal between fonts ... **\\\n    $ --> BOOKMARK_SIGN\n    ≤ --> RING_MARK_L \\** Ring inscription left beautiful stuff **\\\n    ≥ --> RING_MARK_R \\** Ring inscription right beautiful stuff **\\\n \n  \\end\n  \n  \\beg rules numbers\n    0 --> NUM_0\n    1 --> NUM_1\n    2 --> NUM_2\n    3 --> NUM_3\n    4 --> NUM_4\n    5 --> NUM_5\n    6 --> NUM_6\n    7 --> NUM_7\n    8 --> NUM_8\n    9 --> NUM_9\n    A --> NUM_10\n    B --> NUM_11      \n  \\end\n\\end\n\n\\beg postprocessor\n  \\resolve_virtuals\n\\end  \n"