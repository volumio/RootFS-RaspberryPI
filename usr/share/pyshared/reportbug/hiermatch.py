# hiermatch - Doing match on a list of string or a hierarchy.
#   Written by Chris Lawrence <lawrencc@debian.org>
#   Copyright (C) 1999-2008 Chris Lawrence
#   Copyright (C) 2008-2012 Sandro Tosi <morph@debian.org>

import re
import exceptions

def egrep_list(strlist, pattern_str, subindex=None):
    """Use the pattern_str to find any match in a list of strings."""
    """Return: a list of index for the matchs into the origin list."""

    if strlist is None:
        return None

    try:
        pat = re.compile(pattern_str, re.I|re.M)
    except:
        raise exceptions.InvalidRegex
    
    resultlist = []
    if subindex is None:
        subindex = range(len(strlist))
    for i in subindex:
        if pat.search(strlist[i]):
            resultlist.append(i)
    return resultlist

def egrep_hierarchy(hier, pattern_str, subhier=None, nth=1):
    """Grep the nth item of a hierarchy [(x, [a, b]),...]."""
    """Return a subhier like [[n, m],[],...], n, m string index."""
    resulthier = []

    for i in range(len(hier)):
        if subhier:
            if subhier[i]: # Only if have something to match.
                resultlist = egrep_list(hier[i][nth], pattern_str, subhier[i])
            else:
                resultlist = []
        else:
            resultlist = egrep_list(hier[i][nth], pattern_str)

        resulthier.append(resultlist)
    return resulthier

def matched_hierarchy(hier, pattern_str):
    """Actually create a new hierarchy from a pattern matching."""
    mhier = []
    result = egrep_hierarchy(hier, pattern_str)
    for i in range(len(result)):
        if result[i]:
            item = [hier[i][1][y] for y in result[i]]
            mhier.append((hier[i][0], item))
    return mhier

# vim:ts=8:sw=4:expandtab:

