# QDM, a quick-and-dirty markov text generator
# (c) 2013 Izaak Baker

#!/usr/bin/perl
use strict;
use warnings;

# INPUT STUFF
my $FILE_I = shift;
my $FILE_O = shift;
my $NUM_WORDS = shift;

if($FILE_I and $FILE_O and $NUM_WORDS) {
	chomp($FILE_I);
	chomp($FILE_O);
	chomp($NUM_WORDS);
} else {
		die "Try again.  Usage \"perl qdm.pl <input file> <output file> <number of words>\"\n"; 
}

open(my $IN, "<", $FILE_I) or die "\nError opening $FILE_I for input: ($!)";
open(my $OUT, ">", $FILE_O) or die "\nError opening $FILE_O for output: ($!)";

# READ THE FILE
my $string = "";
while(<$IN>) { $string .= " $_"; }

# GENERATE THE GRAPH
my %hash;
my $prev = "";
foreach my $word (split " ", $string) {
	push(@{$hash{$prev}}, $word);
	$prev = $word;
}

# MARKOV-IFY
my @array = keys %hash;
my $k = $array[int(rand(@array))];
foreach (1..$NUM_WORDS) {
	$k = $hash{$k}[int(rand(@{$hash{$k}}))] || "";
	print $OUT "$k ";
}



